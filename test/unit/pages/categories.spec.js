import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import generateCategory from '../../helpers/categoryGenerator.js';
import categories from '@/pages/categories.vue';
import CategoryPreview from '@/components/previews/Category.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import Divider from '@/components/Divider.vue';


const chance = new Chance();

describe('categories page', () => {
  let wrapper, fakeCategories;

  const stubs = {
    NuxtLink: RouterLinkStub,
    'nuxt-content': true,
  };

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(categories, { stubs });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Categories');
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Categories');
  });

  describe('given the categories have not loaded yet', () => {
    beforeEach(() => {
      // mock nuxt content fetch to never resolve (stuck loading behavior)      
      nuxtContentMock.fetch.mockReturnValue(new Promise(() => ({})));

      wrapper = shallowMount(categories, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders CategoryPreview components with no post prop', () => {
      const categoryPreviews = wrapper.findAllComponents(CategoryPreview);

      categoryPreviews.wrappers.forEach((wrapper) => {
        expect(wrapper.props('category')).toEqual(undefined);
      });
    });
  });

  describe('given there are no categories', () => {
    beforeEach(async () => {
      fakeCategories = [];
      nuxtContentMock.fetch.mockResolvedValue({ categories: fakeCategories });

      const data = await categories.asyncData({
        $content: () => nuxtContentMock,
        error: jest.fn()
      });

      categories.data = () => (data);
      wrapper = shallowMount(categories, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders a "no categories" message', () => {
      expect(wrapper.text()).toContain('There are not currently any categories');
    });
  });

  describe('given there are categories', () => {
    beforeEach(async () => {
      fakeCategories = chance.n(generateCategory, chance.integer({
        min: 1, max: 20
      }));

      nuxtContentMock.fetch.mockResolvedValue({ categories: fakeCategories });
      const data = await categories.asyncData({
        $content: () => nuxtContentMock,
        error: jest.fn()
      });

      categories.data = () => (data);
      wrapper = shallowMount(categories, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    afterEach(jest.clearAllMocks);

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('contains the correct text', () => {
      expect(wrapper.text()).toContain("Categories");
    });

    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });


    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });

    it('renders a component for each category', () => {
      fakeCategories.forEach((category) => {
        expect(wrapper.findComponent({ ref: category.slug })).toBeTruthy();
      });
    });

    it('renders the correct number of CategoryPreview components', () => {
      expect(wrapper.findAllComponents(CategoryPreview).wrappers).toHaveLength(fakeCategories.length);
    });
  });

  describe('given there is an issue fetching categories', () => {
    let mockErrorFn, fakeError;

    beforeEach(async () => {
      fakeCategories = [];
      fakeError = new Error(chance.sentence());
      mockErrorFn = jest.fn();
      
      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: (callback) => {
            callback(fakeError);
            return fakeCategories;
          }
        };
      });

      wrapper = shallowMount(categories, {
        stubs: {
          'nuxt-content': true
        }
      });

      await categories.asyncData({
        $content: () => nuxtContentMock,
        error: mockErrorFn,
      });
    });

    it('envokes the nuxt error function correctly', () => {
      expect(mockErrorFn).toBeCalled();
      expect(mockErrorFn).toBeCalledWith({
        statusCode: 500,
        message: 'Something went wrong while fetching categories',
        error: fakeError
      });
    });
  });
});

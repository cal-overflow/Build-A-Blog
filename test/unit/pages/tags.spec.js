import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import generateTag from '../../helpers/tagGenerator.js';
import tags from '@/pages/tags.vue';
import TagPreview from '@/components/previews/Tag.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import Divider from '@/components/Divider.vue';


const chance = new Chance();

describe('tags page', () => {
  let wrapper, fakeTags;

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
    wrapper = shallowMount(tags, { stubs });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Tags');
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Tags');
  });

  describe('given the tags have not loaded yet', () => {
    beforeEach(() => {
      // mock nuxt content fetch to never resolve (stuck loading behavior)      
      nuxtContentMock.fetch.mockReturnValue(new Promise(() => ({})));

      wrapper = shallowMount(tags, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders TagPreview components with no post prop', () => {
      const tagPreviews = wrapper.findAllComponents(TagPreview);

      tagPreviews.wrappers.forEach((wrapper) => {
        expect(wrapper.props('tag')).toEqual(undefined);
      });
    });
  });

  describe('given there are no tags', () => {
    beforeEach(async () => {
      fakeTags = [];
      nuxtContentMock.fetch.mockResolvedValue({ tags: fakeTags });

      const data = await tags.asyncData({
        $content: () => nuxtContentMock,
        error: jest.fn()
      });

      tags.data = () => (data);
      wrapper = shallowMount(tags, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders a "no tags" message', () => {
      expect(wrapper.text()).toContain('There are not currently any tags');
    });
  });

  describe('given there are tags', () => {
    beforeEach(async () => {
      fakeTags = chance.n(generateTag, chance.integer({
        min: 1, max: 20
      }));

      nuxtContentMock.fetch.mockResolvedValue({ tags: fakeTags });
      const data = await tags.asyncData({
        $content: () => nuxtContentMock,
        error: jest.fn()
      });

      tags.data = () => (data);
      wrapper = shallowMount(tags, {
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
      expect(wrapper.text()).toContain("Tags");
    });

    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });


    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });

    it('renders a component for each tag', () => {
      fakeTags.forEach((tag) => {
        expect(wrapper.findComponent({ ref: tag.slug })).toBeTruthy();
      });
    });

    it('renders the correct number of TagPreview components', () => {
      expect(wrapper.findAllComponents(TagPreview).wrappers).toHaveLength(fakeTags.length);
    });
  });

  describe('given there is an issue fetching tags', () => {
    let mockErrorFn, fakeError;

    beforeEach(async () => {
      fakeTags = [];
      fakeError = new Error(chance.sentence());
      mockErrorFn = jest.fn();
      
      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: (callback) => {
            callback(fakeError);
            return fakeTags;
          }
        };
      });

      wrapper = shallowMount(tags, {
        stubs: {
          'nuxt-content': true
        }
      });

      await tags.asyncData({
        $content: () => nuxtContentMock,
        error: mockErrorFn,
      });
    });

    it('envokes the nuxt error function correctly', () => {
      expect(mockErrorFn).toBeCalled();
      expect(mockErrorFn).toBeCalledWith({
        statusCode: 500,
        message: 'Something went wrong while fetching tags',
        error: fakeError
      });
    });
  });
});

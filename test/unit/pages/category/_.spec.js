import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import category from '@/pages/category/_.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import NavBar from '@/components/NavBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';
import FooterBar from '@/components/FooterBar.vue';

const chance = new Chance();

describe('category page', () => {
  let wrapper, fakeCategory;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(category, {
      stubs: {
      'nuxt-content': true
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Blog');
  });

  it('contains the BackToTopButton component', () => {
    const scrollTopButton = wrapper.findComponent(BackToTopButton);
    expect(scrollTopButton.exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Blog'); 
  });

  describe('given a valid category slug', () => {
    let fakeCategorySlug;

    beforeEach(async () => {
      fakeCategorySlug = chance.string();

      fakeCategory = {
        title: chance.string(),
        description: chance.paragraph(),
        slug: fakeCategorySlug.toLowerCase()
      };

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => ({ categories: [fakeCategory] })
        };
      });

      // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
      const originalData = category?.data?.() || {};
      const data = await category.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: fakeCategorySlug,
        },
        error: jest.fn(),
      });

      category.data = () => {
        return { ...originalData, ...data };
      };

      wrapper = shallowMount(category, {
        stubs: {
          'nuxt-content': true
        }
      });
    });

    afterEach(jest.clearAllMocks);

    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });

    it('renders a BlogFeed component with the correct prop', () => {
      const feed = wrapper.findComponent(BlogFeed);
      
      expect(feed.exists()).toBeTruthy();
      expect(feed.props('category')).toEqual(fakeCategory);
    });

    describe('given there is an issue fetching data', () => {
      let mockErrorFn, fakeError;

      beforeEach(async () => {
        fakeError = new Error(chance.sentence());

        mockErrorFn = jest.fn();

        nuxtContentMock.fetch.mockImplementation(() => {
          return {
            catch: (callback) => callback(fakeError)
          };
        });

        await category.asyncData({
          $content: () => nuxtContentMock,
          params: {
            pathMatch: fakeCategory.slug,
          },
          error: mockErrorFn,
        });
      });

      it('envokes the nuxt error function correctly', () => {
        expect(mockErrorFn).toBeCalled();
        expect(mockErrorFn).toBeCalledWith({
          statusCode: 500,
          message: 'Something went wrong',
          error: fakeError
        });
      });
    });
  });

  describe('given an invalid post slug (non-existent post)', () => {
    let mockErrorFn;

    beforeEach(async () => {
      mockErrorFn = jest.fn();

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => ({ categories: [] })
        };
      });

      await category.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: chance.string(),
        },
        error: mockErrorFn,
      });
    });

    it('envokes the nuxt error function corrctly', () => {
      expect(mockErrorFn).toBeCalled();
      expect(mockErrorFn).toBeCalledWith({
        statusCode: 404,
        message: 'This category could not be found',
      });
    });
  });

  describe('given a category is "Portfolio"', () => {
    beforeEach(async () => {
      fakeCategory = {
        title: 'Portfolio',
        description: chance.paragraph(),
        slug: 'portfolio'
      };

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => ({ categories: [fakeCategory] })
        };
      });

      // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
      const originalData = category?.data?.() || {};
      const data = await category.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: 'portfolio',
        },
        error: jest.fn(),
      });

      category.data = () => {
        return { ...originalData, ...data };
      };

      wrapper = shallowMount(category, {
        stubs: {
          'nuxt-content': true
        }
      });
    });

    afterEach(jest.clearAllMocks);

    it('renders the correct current-page prop for NavBar', () => {
      expect(wrapper.findComponent(NavBar).props('currentPage')).toEqual('Portfolio');
    });
    
    it('renders the correct current-page prop for FooterBar', () => {
      expect(wrapper.findComponent(FooterBar).props('currentPage')).toEqual('Portfolio');
    });
  });
});

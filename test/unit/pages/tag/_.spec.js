import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import tag from '@/pages/tag/_.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import NavBar from '@/components/NavBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';
import FooterBar from '@/components/FooterBar.vue';

const chance = new Chance();

describe('tag page', () => {
  let wrapper, fakeTag;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(tag, {
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
    expect(navBar.props('currentPage')).toEqual('Tags');
  });

  it('contains the BackToTopButton component', () => {
    const scrollTopButton = wrapper.findComponent(BackToTopButton);
    expect(scrollTopButton.exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Tags'); 
  });

  describe('given a valid tag slug', () => {
    let fakeTagSlug;

    beforeEach(async () => {
      fakeTagSlug = chance.string();

      fakeTag = {
        title: chance.string(),
        description: chance.paragraph(),
        slug: fakeTagSlug.toLowerCase()
      };

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => ({ tags: [fakeTag] })
        };
      });

      // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
      const originalData = tag?.data?.() || {};
      const data = await tag.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: fakeTagSlug,
        },
        error: jest.fn(),
      });

      tag.data = () => {
        return { ...originalData, ...data };
      };

      wrapper = shallowMount(tag, {
        stubs: {
          'nuxt-content': true
        }
      });
    });

    afterEach(jest.clearAllMocks);

    it('renders the NavBar component with the correct props', () => {
      const navBar = wrapper.findComponent(NavBar);
      expect(navBar.exists()).toBeTruthy();
      expect(navBar.props('currentPage')).toEqual(fakeTag.title);
    });
  
    it('contains the FooterBar component', () => {
      const footer = wrapper.findComponent(FooterBar);
      expect(footer.exists()).toBeTruthy();
      expect(footer.props('currentPage')).toEqual(fakeTag.title); 
    });

    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });

    it('renders a BlogFeed component with the correct prop', () => {
      const feed = wrapper.findComponent(BlogFeed);
      
      expect(feed.exists()).toBeTruthy();
      expect(feed.props('tag')).toEqual(fakeTag);
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

        await tag.asyncData({
          $content: () => nuxtContentMock,
          params: {
            pathMatch: fakeTag.slug,
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
          catch: () => ({ tags: [] })
        };
      });

      await tag.asyncData({
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
        message: 'This tag could not be found',
      });
    });
  });

  describe('given a tag is "Portfolio"', () => {
    beforeEach(async () => {
      fakeTag = {
        title: 'Portfolio',
        description: chance.paragraph(),
        slug: 'portfolio'
      };

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => ({ tags: [fakeTag] })
        };
      });

      // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
      const originalData = tag?.data?.() || {};
      const data = await tag.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: 'portfolio',
        },
        error: jest.fn(),
      });

      tag.data = () => {
        return { ...originalData, ...data };
      };

      wrapper = shallowMount(tag, {
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

import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import generatePost from '../../../helpers/postGenerator';
import post from '@/pages/post/_.vue';
import NavBar from '@/components/NavBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';
import FooterBar from '@/components/FooterBar.vue';

const chance = new Chance();

describe('post page', () => {
  let wrapper, fakePost;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(post, {
      stubs: {
        'nuxt-content': true,
        NuxtLink: RouterLinkStub,
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

  describe('given a valid post slug', () => {
    beforeEach(async () => {
      fakePost = generatePost();

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => [fakePost]
        };
      });

      // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
      const originalData = post?.data?.() || {};
      const data = await post.asyncData({
        $content: () => nuxtContentMock,
        params: {
          pathMatch: fakePost.slug,
        },
        error: jest.fn(),
      });

      post.data = () => {
        return { ...originalData, ...data };
      };

      wrapper = shallowMount(post, {
        stubs: {
          'nuxt-content': true,
          NuxtLink: RouterLinkStub
        }
      });
    });

    afterEach(jest.clearAllMocks);

    it('calls nuxt content search with the correct values', () => {
      expect(nuxtContentMock.search).toBeCalledTimes(1);
      expect(nuxtContentMock.search).toBeCalledWith('slug', fakePost.slug);
    });

    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });

    it('renders the post title and date correctly', () => {
      expect(wrapper.text()).toContain(fakePost.title);
      expect(wrapper.text()).toContain(fakePost.date);
    });

    it('renders the post categories correctly', () => {
      expect(wrapper.text()).toContain(fakePost.title);
      expect(wrapper.text()).toContain(fakePost.date);
      
      fakePost.categories.forEach((category) => {
        expect(wrapper.text()).toContain(category);
      });
    });

    it('renders the post categories with the correct link', () => {
      const linkComponents = wrapper.findAllComponents(RouterLinkStub);

      fakePost.categories.forEach((category) => {
        const expectedPath = `/category/${category.toLowerCase().replace(' ', '-')}`;

        const component = linkComponents.wrappers.find((el) => el.text() === category);
        expect(component.props('to')).toEqual(expectedPath);
      });
    });

    it('renders the post feature image correctly', () => {
      expect(wrapper.html()).toContain(`<img id="post-feature-image" src="${fakePost.img}"`);
    });

    it('contains nuxt content element for the post body', () => {
      expect(wrapper.html()).toContain('<nuxt-content-stub');
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

        await post.asyncData({
          $content: () => nuxtContentMock,
          params: {
            pathMatch: fakePost.slug,
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
      fakePost = undefined;
      mockErrorFn = jest.fn();

      nuxtContentMock.fetch.mockImplementation(() => {
        return {
          catch: () => fakePost
        };
      });

      await post.asyncData({
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
        message: 'This post could not be found',
      });
    });
  });  
});

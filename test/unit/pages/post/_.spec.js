// import { shallowMount, RouterLinkStub } from '@vue/test-utils';
// import Chance from 'chance';
// import generatePost from '../../../helpers/postGenerator';
// import post from '@/pages/posts/_.vue';
// import PostView from '@/components/views/Post.vue';
// import NavBar from '@/components/structural/NavBar.vue';
// import BackToTopButton from '@/components/helpers/BackToTopButton.vue';
// import FooterBar from '@/components/structural/FooterBar.vue';

// const chance = new Chance();

describe('post page', () => {
  // TODO
  it.todo("Here is a todo");
  // let wrapper, fakePost;

  // const nuxtContentMock = {
  //   $content: jest.fn().mockReturnThis(),
  //   search: jest.fn().mockReturnThis(),
  //   fetch: jest.fn(),
  //   $router: jest.fn().mockReturnThis(),
  // };

  // beforeEach(() => {
  //   wrapper = shallowMount(post, {
  //     stubs: {
  //       'nuxt-content': true,
  //       NuxtLink: RouterLinkStub,
  //     }
  //   });
  // });

  // it('is a Vue instance', () => {
  //   expect(wrapper.vm).toBeTruthy();
  // });

  // it('renders the NavBar component with the correct props', () => {
  //   const navBar = wrapper.findComponent(NavBar);
  //   expect(navBar.exists()).toBeTruthy();
  //   expect(navBar.props('currentPage')).toEqual('Blog');
  // });

  // it('contains the BackToTopButton component', () => {
  //   const scrollTopButton = wrapper.findComponent(BackToTopButton);
  //   expect(scrollTopButton.exists()).toBeTruthy();
  // });

  // it('contains the FooterBar component', () => {
  //   const footer = wrapper.findComponent(FooterBar);
  //   expect(footer.exists()).toBeTruthy();
  //   expect(footer.props('currentPage')).toEqual('Blog'); 
  // });

  // describe('given a valid post slug', () => {
  //   beforeEach(async () => {
  //     fakePost = generatePost();

  //     nuxtContentMock.fetch.mockImplementation(() => {
  //       return {
  //         catch: () => [fakePost]
  //       };
  //     });

  //     // Source: https://github.com/nuxt/docs/issues/1600#issuecomment-535994612
      
  //     const originalData = post?.data?.() || {};
  //     const data = await post.asyncData({
  //       $content: () => nuxtContentMock,
  //       params: {
  //         pathMatch: fakePost.slug,
  //       },
  //       error: jest.fn(),
  //     });

  //     post.data = () => {
  //       return { ...originalData, ...data };
  //     };

  //     wrapper = shallowMount(post, {
  //       stubs: {
  //         'nuxt-content': true,
  //         NuxtLink: RouterLinkStub
  //       }
  //     });
  //   });

  //   afterEach(jest.clearAllMocks);

  //   it('calls nuxt content search with the correct values', () => {
  //     expect(nuxtContentMock.search).toBeCalledTimes(1);
  //     expect(nuxtContentMock.search).toBeCalledWith('slug', fakePost.slug);
  //   });

  //   it('calls nuxt content fetch', () => {
  //     expect(nuxtContentMock.fetch).toBeCalledTimes(1);
  //   });

  //   it('contains the PostView component', () => {
  //     const postView = wrapper.findComponent(PostView);
  //     expect(postView.exists()).toBeTruthy();
  //   });

  //   describe('given there is an issue fetching data', () => {
  //     let mockErrorFn, fakeError;

  //     beforeEach(async () => {
  //       fakeError = new Error(chance.sentence());

  //       mockErrorFn = jest.fn();

  //       nuxtContentMock.fetch.mockImplementation(() => {
  //         return {
  //           catch: (callback) => callback(fakeError)
  //         };
  //       });

  //       await post.asyncData({
  //         $content: () => nuxtContentMock,
  //         params: {
  //           pathMatch: fakePost.slug,
  //         },
  //         error: mockErrorFn,
  //       });
  //     });

  //     it('envokes the nuxt error function correctly', () => {
  //       expect(mockErrorFn).toBeCalled();
  //       expect(mockErrorFn).toBeCalledWith({
  //         statusCode: 500,
  //         message: 'Something went wrong',
  //         error: fakeError
  //       });
  //     });
  //   });
  // });

  // describe('given an invalid post slug (non-existent post)', () => {
  //   let mockErrorFn;

  //   beforeEach(async () => {
  //     fakePost = undefined;
  //     mockErrorFn = jest.fn();

  //     nuxtContentMock.fetch.mockImplementation(() => {
  //       return {
  //         catch: () => fakePost
  //       };
  //     });

  //     await post.asyncData({
  //       $content: () => nuxtContentMock,
  //       params: {
  //         pathMatch: chance.string(),
  //       },
  //       error: mockErrorFn,
  //     });
  //   });

  //   it('envokes the nuxt error function corrctly', () => {
  //     expect(mockErrorFn).toBeCalled();
  //     expect(mockErrorFn).toBeCalledWith({
  //       statusCode: 404,
  //       message: 'This post could not be found',
  //     });
  //   });
  // });  
});

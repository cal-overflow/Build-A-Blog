import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import generatePost from '../../../helpers/postGenerator';
import PostFeed from '@/components/views/PostFeed.vue';
import PostPreview from '@/components/previews/Post.vue';
import Divider from '@/components/misc/Divider.vue';

const chance = new Chance();
const postLimit = 10;

describe('PostFeed component', () => {
  let wrapper, fakePosts;

  const stubs = {
    'nuxt-link': true,
    'nuxt-content': true,
  };
  const mocks = {
    $route: { query: {} },
  };

  // const nuxtContentMock = {
  //   $content: jest.fn().mockReturnThis(),
  //   sortBy: jest.fn().mockReturnThis(),
  //   limit: jest.fn().mockReturnThis(),
  //   where: jest.fn().mockReturnThis(),
  //   fetch: jest.fn(),
  // };

  describe('given there are no posts', () => {
    beforeEach(() => {
      fakePosts = [];

      wrapper = shallowMount(PostFeed, {
        stubs,
        mocks,
        propsData: { content: fakePosts, dir: chance.string() }
      });
    });

    it('renders a "no posts" message', () => {
      expect(wrapper.text()).toContain('No posts have been written');
    });
  });

  describe('given there are posts and the metadata prop is given', () => {
    const title = chance.string();
    const description = chance.string();
    beforeEach(() => {
      fakePosts = chance.n(generatePost, chance.integer({
        min: 1, max: postLimit
      }));

      wrapper = shallowMount(PostFeed, {
        stubs,
        mocks,
        propsData: {
          metadata: {
            title,
            description,
          },
          content: fakePosts,
          dir: chance.string()
        }
      });
    });
  
    afterEach(jest.clearAllMocks);
  
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });
  
    it('contains the correct text', () => {
      expect(wrapper.text()).toContain(title);
    });

    it('contains the correct text', () => {
      expect(wrapper.text()).toContain(description);
    });
  
    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });
  
    // it('calls nuxt content sortBy with correct values', () => {
    //   expect(nuxtContentMock.sortBy).toBeCalledTimes(1);
    //   expect(nuxtContentMock.sortBy).toBeCalledWith('id', 'desc');
    // });
  
    // it('calls nuxt content limit with correct value', () => {
    //   expect(nuxtContentMock.limit).toBeCalledTimes(1);
    //   expect(nuxtContentMock.limit).toBeCalledWith(postLimit + 1);
    // });
  
    it('renders a component for each post', () => {
      fakePosts.forEach((post) => {
        expect(wrapper.findComponent({ ref: post.slug })).toBeTruthy();
      });
    });

    it('renders the correct number of PostPreview components', () => {
      expect(wrapper.findAllComponents(PostPreview).wrappers).toHaveLength(fakePosts.length);
    });
  });

  describe('given no metadata prop is given', () => {  
    beforeEach(() => {
      wrapper = shallowMount(PostFeed, {
        mocks,
        propsData: {
          content: fakePosts,
          dir: chance.string()
        }
      });
    });

    it('contains the correct text', () => {
      expect(wrapper.text()).toContain("Feed");
    });
  });

  // TODO - restore these without nuxt content
  // describe('given there are more posts than can possibly be displayed on the page', () => {
  //   beforeEach(() => {
  //     fakePosts = chance.n(generatePost, chance.integer({
  //       min: (postLimit * 2),
  //       max: (postLimit * 4),
  //     }));
  //     // nuxtContentMock.fetch.mockResolvedValue(fakePosts);

  //     wrapper = shallowMount(PostFeed, {
  //       mocks: {
  //         $content: () => nuxtContentMock,
  //       },
  //       stubs,
  //     });
  //   });

  //   afterEach(jest.clearAllMocks);

  //   it('fetches more posts when the user scrolls halfway through page', () => {
  //     // expect(nuxtContentMock.fetch).toBeCalledTimes(1);
  //     expect(nuxtContentMock.limit).toHaveBeenCalledWith(postLimit + 1);

  //     Object.defineProperty(window, 'scrollY', {
  //       writable: true,
  //       configurable: true,
  //       value: 51,
  //     });

  //     Object.defineProperty(document, 'body', {
  //       writable: true,
  //       configurable: true,
  //       value: {
  //         offsetHeight: 100
  //       }
  //     });
      
  //     window.dispatchEvent(new Event('scroll'));

  //     // expect(nuxtContentMock.fetch).toBeCalledTimes(2);
  //     expect(nuxtContentMock.limit).toHaveBeenCalledWith((postLimit * 2) + 1);
  //   });

  //   it('renders a "loadMorePosts" element that retrieves more posts on press', async () => {
  //     const loadMoreWrapper = wrapper.findComponent({ ref: 'loadMorePosts' });

  //     expect(loadMoreWrapper.text()).toContain('Load more');

  //     expect(nuxtContentMock.fetch).toBeCalledTimes(1);
  //     expect(nuxtContentMock.limit).toHaveBeenCalledWith(postLimit + 1);
      
  //     await loadMoreWrapper.trigger('mousedown');
      
  //     expect(nuxtContentMock.fetch).toBeCalledTimes(2);
  //     expect(nuxtContentMock.limit).toHaveBeenCalledWith((postLimit * 2) + 1);
  //   });
  // });

  // describe('given a tag prop is given', () => {
  //   let tag;

  //   beforeEach(() => {
  //     fakePosts = chance.n(generatePost, chance.integer({`
  //       min: 1, max: postLimit
  //     }));

  //     tag = {
  //       title: chance.string(),
  //       description: chance.paragraph(),
  //     };

  //     // nuxtContentMock.fetch.mockResolvedValue(fakePosts);

  //     wrapper = shallowMount(PostFeed, {
  //       // mocks: {
  //       //   $content: () => nuxtContentMock
  //       // },
  //       propsData: { tag },
  //       stubs,
  //     });
  //   });

  //   afterEach(jest.clearAllMocks);
    
  //   // it('contains the tag title and description', () => {
  //   //   expect(wrapper.text()).toContain(tag.title);
  //   //   expect(wrapper.text()).toContain(tag.description);
  //   // });
  // });
});

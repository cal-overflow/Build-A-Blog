import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import generatePost from '../helpers/postGenerator';
import BlogFeed from '@/components/BlogFeed.vue';
import PostPreview from '@/components/previews/Post.vue';
import Divider from '@/components/Divider.vue';

const chance = new Chance();

const postLimit = 10;

describe('BlogFeed component', () => {
  let wrapper, fakePosts;

  const stubs = {
    'nuxt-link': true,
    'nuxt-content': true,
  };

  const nuxtContentMock = {
    '$content': jest.fn().mockReturnThis(),
    'sortBy': jest.fn().mockReturnThis(),
    'limit': jest.fn().mockReturnThis(),
    'fetch': jest.fn(),
  };

  describe('given there are no posts (or they have not loaded)', () => {
    beforeEach(() => {
      fakePosts = [];
      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          '$content': () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders the maximum number of PostPreview components with no post prop', () => {
      const postPreviews = wrapper.findAllComponents(PostPreview);
      expect(postPreviews).toHaveLength(postLimit);

      postPreviews.wrappers.forEach((wrapper) => {
        expect(wrapper.props('post')).toEqual(undefined);
      });
    });
  });

  describe('given there are posts', () => {
    beforeEach(() => {
      fakePosts = chance.n(generatePost, chance.integer({
        min: 1, max: postLimit
      }));
      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          '$content': () => nuxtContentMock
        },
        stubs,
      });
    });
  
    afterEach(jest.clearAllMocks);
  
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });
  
    it('contains the correct text', () => {
      expect(wrapper.text()).toContain("Blog");
    });
  
    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });
  
    it('calls nuxt content sortBy with correct values', () => {
      expect(nuxtContentMock.sortBy).toBeCalledTimes(1);
      expect(nuxtContentMock.sortBy).toBeCalledWith('createdAt', 'desc');
    });
  
    it('calls nuxt content limit with correct value', () => {
      expect(nuxtContentMock.limit).toBeCalledTimes(1);
      expect(nuxtContentMock.limit).toBeCalledWith(postLimit + 1);
    });
  
    it('calls nuxt content fetch', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
    });
  
    it('renders a component for each post', () => {
      fakePosts.forEach((post) => {
        expect(wrapper.findComponent({ref: post.slug})).toBeTruthy();
      });
    });

    it('renders the correct number of PostPreview components', () => {
      expect(wrapper.findAllComponents(PostPreview).wrappers).toHaveLength(fakePosts.length);
    });
  });

  describe('given there are more posts than can possibly be displayed on the page', () => {
    beforeEach(() => {
      fakePosts = chance.n(generatePost, chance.integer({
        min: (postLimit * 2),
        max: (postLimit * 4),
      }));
      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          '$content': () => nuxtContentMock,
        },
        stubs,
      });
    });

    afterEach(jest.clearAllMocks);

    it('fetches more posts when the user scrolls halfway through page', () => {
      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
      expect(nuxtContentMock.limit).toHaveBeenCalledWith(postLimit + 1);

      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 51,
      });

      Object.defineProperty(document, 'body', {
        writable: true,
        configurable: true,
        value: {
          offsetHeight: 100
        }
      });
      
      window.dispatchEvent(new Event('scroll'));

      expect(nuxtContentMock.fetch).toBeCalledTimes(2);
      expect(nuxtContentMock.limit).toHaveBeenCalledWith((postLimit * 2) + 1);
    });

    it('renders a "loadMorePosts" element that retrieves more posts on press', async () => {
      const loadMoreWrapper = wrapper.findComponent({ref: 'loadMorePosts'});

      expect(loadMoreWrapper.text()).toContain('Load more');

      expect(nuxtContentMock.fetch).toBeCalledTimes(1);
      expect(nuxtContentMock.limit).toHaveBeenCalledWith(postLimit + 1);
      
      await loadMoreWrapper.trigger('mousedown');
      
      expect(nuxtContentMock.fetch).toBeCalledTimes(2);
      expect(nuxtContentMock.limit).toHaveBeenCalledWith((postLimit * 2) + 1);
    });
  });
});
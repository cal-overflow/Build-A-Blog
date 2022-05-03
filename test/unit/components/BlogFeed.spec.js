import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import generatePost from '../../helpers/postGenerator';
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
    $content: jest.fn().mockReturnThis(),
    sortBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  describe('given the posts have not loaded yet', () => {
    beforeEach(() => {
      // mock nuxt content fetch to never resolve (stuck loading behavior)      
      nuxtContentMock.fetch.mockReturnValue(new Promise(() => ({})));

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          $content: () => nuxtContentMock
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

  describe('given there are no posts', () => {
    beforeEach(() => {
      fakePosts = [];
      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders a "no posts" message', () => {
      expect(wrapper.text()).toContain('No posts have been written');
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
      expect(wrapper.text()).toContain("Blog");
    });
  
    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });
  
    it('calls nuxt content sortBy with correct values', () => {
      expect(nuxtContentMock.sortBy).toBeCalledTimes(1);
      expect(nuxtContentMock.sortBy).toBeCalledWith('id', 'desc');
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
          $content: () => nuxtContentMock,
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

  describe('given a category prop is given', () => {
    let category;

    beforeEach(() => {
      fakePosts = chance.n(generatePost, chance.integer({
        min: 1, max: postLimit
      }));

      category = {
        title: chance.string(),
        description: chance.paragraph(),
      };

      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          $content: () => nuxtContentMock
        },
        propsData: { category },
        stubs,
      });
    });

    afterEach(jest.clearAllMocks);
    
    it('contains the category title and description', () => {
      expect(wrapper.text()).toContain(category.title);
      expect(wrapper.text()).toContain(category.description);
    });

    it('envokes the nuxt content "where" method to find the correct posts', () => {
      expect(nuxtContentMock.where).toBeCalledTimes(1);
      expect(nuxtContentMock.where).toBeCalledWith({
        categories: {$contains: category.title}
      });
    });
  });

  describe('given an error occurs fetching nuxt content', () => {
    let nuxtMock, fakeError;

    beforeEach(() => {
      nuxtMock = {
        error: jest.fn()
      };

      fakeError = new Error(chance.string());

      nuxtContentMock.fetch.mockRejectedValue(fakeError);

      wrapper = shallowMount(BlogFeed, {
        mocks: {
          $content: () => nuxtContentMock,
          $nuxt: nuxtMock
        },
        stubs,
      });
    });

    afterEach(jest.clearAllMocks);

    it('envokes nuxt error function correctly', () => {
      expect(nuxtMock.error).toBeCalledTimes(1);
      expect(nuxtMock.error).toBeCalledWith({
        statusCode: 500,
        message: 'Something went wrong fetching posts',
        error: fakeError
      });
    });
  });
});

import { mount, RouterLinkStub } from '@vue/test-utils';
import { Chance } from 'chance';
import generatePost from '../../../helpers/postGenerator';
import PostPreview from '@/components/previews/Post.vue';

const chance = new Chance();

describe('PostPreview component', () => {
  let wrapper, post;

  const stubs = {
    'NuxtLink': RouterLinkStub,
    'nuxt-content': true,
  };
  const mocks = {
    '$route': {
      'fullPath': `/${chance.string({ pool: 'abcdef' })}`
    }
  };

  describe('given no post is passed in', () => {
    beforeEach(() => {
      wrapper = mount(PostPreview, { stubs, mocks, propsData: { dir: chance.string() } });
    });

    afterEach(jest.clearAllMocks);

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('renders the placeholder/lazy-loading content', () => {
      expect(wrapper.findComponent({ ref: 'lazy-load-post-preview' }).exists()).toBeTruthy();
    });
  });

  describe('given a post is passed in', () => {

    beforeEach(() => {
      post = generatePost();
  
      wrapper = mount(PostPreview, {
        propsData: { post, dir: chance.string() },
        stubs,
        mocks,
      });
    });

    afterEach(jest.clearAllMocks);
  
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('contains the correctly linked title', () => {
      const title = wrapper.findComponent({ ref: 'title' });
      expect(title.text()).toEqual(post.title);
      expect(title.props('to')).toEqual(`${post.dir}/${post.slug}`);
    });

    it('contains correctly linked feature image', () => {
      const imageWrapper = wrapper.findComponent({ ref: 'feature-image' });

      expect(imageWrapper.props('to')).toEqual(`${post.dir}/${post.slug}`);
      expect(imageWrapper.html()).toContain(`<img src="${post.img}"`);
    });
    
    // Not the ideal way of doing this, since we aren't actually testing the excerpt is present
    it('contains nuxt content element for the excerpt', () => {
      expect(wrapper.html()).toContain('<nuxt-content-stub');
    });

    it('computes the excerpt object correctly', () => {
      const expectedExcerptObj = {
        body: post.excerpt
      };

      expect(JSON.stringify(wrapper.vm.excerpt)).toEqual(JSON.stringify(expectedExcerptObj));
    });

    // This will likely require mocking the Nuxt Content module in some way.
    it.todo('contains the excerpt text');

    it('contains the correctly linked "Continue reading"', () => {
      const continueLink = wrapper.findComponent({ ref: 'continue-reading' });

      expect(continueLink.text()).toEqual('Continue reading');
      expect(continueLink.props('to')).toEqual(`${post.dir}/${post.slug}`);
    });
  });
});

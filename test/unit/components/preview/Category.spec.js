import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import generateCategory from '../../../helpers/categoryGenerator.js';
import generatePost from '../../../helpers/postGenerator';
import PostPreview from '@/components/previews/Post.vue';
import CategoryPreview from '@/components/previews/Category.vue';
import ToolTip from '@/components/ToolTip.vue';

const chance = new Chance();
const postLimit = 4;

describe('CategoryPreview component', () => {
  let wrapper, fakeCategory, fakeIndex, fakePosts, numberFakePosts;

  const stubs = {
    NuxtLink: RouterLinkStub,
    'nuxt-content': true,
  };

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    sortBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
    catch: jest.fn().mockReturnThis(),
  };

  describe('given the category and index prop is passed in with a single post', () => {
    beforeEach(() => {
      fakeCategory = generateCategory();
      fakeIndex = chance.integer();
      fakePosts = chance.n(() => generatePost(fakeCategory.title), 1);

      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(CategoryPreview, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
        propsData: {
          category: fakeCategory,
          index: fakeIndex
        }
      });
    });
    
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('contains the correct category title', () => {
      expect(wrapper.text()).toContain(fakeCategory.title);
    });

    it('contains the correct category description', () => {
      expect(wrapper.text()).toContain(fakeCategory.description);
    });

    it('contains the text "Latest Posts"', () => {
      expect(wrapper.text()).toContain("Latest Posts");
    });

    it('contains a PostPreview', () => {
      const postPreviews = wrapper.findAllComponents(PostPreview);
      expect(postPreviews).toHaveLength(1);
    });

    it('does not contain a ToolTip', () => {
      const ToolTips = wrapper.findAllComponents(ToolTip);
      expect(ToolTips).toHaveLength(0);
    });
  });

  describe('given the category and index prop is passed in with multiple posts', () => {
    let fakeTimePerPostPreview, fakeTimeSinceLastSwitch;
    beforeEach(() => {
      fakeCategory = generateCategory();
      fakeIndex = chance.integer();
      numberFakePosts = chance.integer({ min: 2, max: postLimit });
      fakePosts = chance.n(() => generatePost(fakeCategory.title), numberFakePosts);
      fakeTimePerPostPreview = chance.integer({min: 3000, max: 7000});
      fakeTimeSinceLastSwitch = fakeTimePerPostPreview - chance.integer({min: 50, max: 2000});

      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(CategoryPreview, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
        propsData: {
          category: fakeCategory,
          index: fakeIndex,
        },
      });
      wrapper.setData({timePerPostPreview: fakeTimePerPostPreview, timeSinceLastSwitch: fakeTimeSinceLastSwitch});
    });

    it('contains n number ToolTips', () => {
      const ToolTips = wrapper.findAllComponents(ToolTip);
      expect(ToolTips).toHaveLength(numberFakePosts);
    });

    it('ToolTips contain the correct title', () => {
      fakePosts.forEach((post) => {
        expect(wrapper.findComponent({ ref: post.title }).attributes('text')).toEqual(post.title);
      });
    });

    it('contains a NuxtLink with the correct text and href', () => {
      const link = wrapper.findComponent({ ref: "view-category" });

      expect(link.text()).toContain("View all posts");
      expect(link.props('to')).toEqual(`/category/${fakeCategory.slug}`);
    });

    it('previewPercentage works', () => {
      const fakePercentage = (fakeTimeSinceLastSwitch / fakeTimePerPostPreview) * 100;
      expect(wrapper.vm.previewPercentage).toEqual(fakePercentage);
    });
  });

  describe('given the category and index prop is passed in with no posts', () => {
    beforeEach(() => {
      fakeCategory = generateCategory();
      fakeIndex = chance.integer();
      numberFakePosts = 0;
      fakePosts = chance.n(() => generatePost(fakeCategory.title), numberFakePosts);

      nuxtContentMock.fetch.mockResolvedValue(fakePosts);

      wrapper = shallowMount(CategoryPreview, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs: {
          'nuxt-content': true
        },
        propsData: {
          category: fakeCategory,
          index: fakeIndex
        }
      });
    });

    it('contains the correct category title', () => {
      expect(wrapper.text()).toContain("There are not currently any posts for this category");
    });
  });

  describe('given the category or index prop is not yet passed in', () => {
    beforeEach(() => {
      wrapper = shallowMount(CategoryPreview, {
        stubs: {
          'nuxt-content': true
        },
        props: {
          category: undefined,
          index: undefined
        }
      });
    });

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('contains a PostPreview', () => {
      const postPreviews = wrapper.findAllComponents(PostPreview);
      expect(postPreviews).toHaveLength(1);
    });

    it('does not render the nuxt-content', () => {
      expect(wrapper.html()).not.toContain('<nuxt-content-stub');
    });

    it('renders the placeholder/lazy-loading content', () => {
      expect(wrapper.findComponent({ ref: 'lazy-load-category-preview' }).exists()).toBeTruthy();
    });
  });
});

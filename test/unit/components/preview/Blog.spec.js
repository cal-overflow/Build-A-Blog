import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import BlogPreview from '@/components/previews/Blog.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('BlogPreview component', () => {
  let wrapper;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn().mockReturnThis(),
    catch: () => {}
  };

  beforeEach(() => {
    wrapper = shallowMount(BlogPreview, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'nuxt-content': true,
      },
      mocks: {
        $content: () => nuxtContentMock
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct header', () => {
    expect(wrapper.text()).toContain("Blog");
  });

  it('contains a Divider component', () => {
    expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
  });

  it('contains a NavItem link to the blog', () => {
    const blogLink = wrapper.findComponent(NavItem);
    expect(blogLink.exists()).toBeTruthy();
    expect(blogLink.props('title')).toEqual('View my blog');
    expect(blogLink.props('href')).toEqual('/blog');
  });

});
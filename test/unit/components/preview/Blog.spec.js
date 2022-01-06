import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import BlogPreview from '@/components/previews/Blog.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('BlogPreview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BlogPreview, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Blog");
    expect(wrapper.text()).toContain("My blog is where I post about my experiences as a software engineer. This consists of the struggle and learning I underwent while working on the projects you'll find in my portfolio or while taking a course at Iowa State University.");
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
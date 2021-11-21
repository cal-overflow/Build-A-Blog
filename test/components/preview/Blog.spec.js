import { shallowMount } from '@vue/test-utils';
import BlogPreview from '@/components/previews/Blog.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('BlogPreview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BlogPreview);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Blog");
    expect(wrapper.text()).toContain("My blog is where I post all of my computer-related experiences. This consists of the struggle and learning I underwent working on things like the projects you’ll find in my portfolio. I also post blogs regarding my Iowa State University courses.");
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
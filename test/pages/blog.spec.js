import { shallowMount } from '@vue/test-utils';
import blog from '@/pages/blog.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

describe('blog page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(blog);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the nav-bar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Blog');
  });

  it('contains the BlogFeed component', () => {
    expect(wrapper.findComponent(BlogFeed).exists()).toBeTruthy();
  });

  it('contains the footer component', () => {
    const footer = wrapper.findComponent(Footer);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Blog'); 
  });
});
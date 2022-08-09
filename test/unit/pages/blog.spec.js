import { shallowMount } from '@vue/test-utils';
import blog from '@/pages/blog.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import NavBar from '@/components/NavBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';
import FooterBar from '@/components/FooterBar.vue';

describe('blog page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(blog);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Blog');
  });

  it('contains the BlogFeed component', () => {
    expect(wrapper.findComponent(BlogFeed).exists()).toBeTruthy();
  });

  it('contains the BackToTopButton component', () => {
    const scrollTopButton = wrapper.findComponent(BackToTopButton);
    expect(scrollTopButton.exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Blog'); 
  });
});

import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';
import NavItem from '@/components/NavItem.vue';

describe('NavBar component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      propsData: {currentPage: 'Home'},
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NavItem for each of the links', () => {
    expect(wrapper.findAllComponents(NavItem)).toHaveLength(3);
  });

  it('correctly renders the NavItem for the signature header (home page)', () => {
    const navItem = wrapper.findComponent('[title="Christian Lisle"]');
    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/');
    expect(navItem.props('active')).toBeTruthy();
  });

  it('renders a NavItem for the blog page', () => {
    const navItem = wrapper.findComponent('[title="Blog"]');
    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/blog');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders a NavItem for the Portfolio page', () => {
    const navItem = wrapper.findComponent('[title="Portfolio"]');
    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/category/portfolio');
    expect(navItem.props('active')).not.toBeTruthy();
  });
});
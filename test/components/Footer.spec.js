import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';
import NavItem from '@/components/NavItem.vue';

describe('Footer component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Footer);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NavItem for each of the links', () => {
    expect(wrapper.findAllComponents(NavItem)).toHaveLength(2);
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
    expect(navItem.props('href')).toEqual('/portfolio');
    expect(navItem.props('active')).not.toBeTruthy();
  });
});
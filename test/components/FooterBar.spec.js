import { shallowMount } from '@vue/test-utils';
import FooterBar from '@/components/FooterBar.vue';
import NavItem from '@/components/NavItem.vue';

describe('FooterBar component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FooterBar);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NavItem for each of the links', () => {
    expect(wrapper.findAllComponents(NavItem)).toHaveLength(3);
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

  it('renders a NavItem for the contact page', () => {
    const navItem = wrapper.findComponent('[title="Contact"]');
    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/contact');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders a linked Github logo that is correctly styled', () => {
    const img = wrapper.find('img');
    expect(wrapper.find('a').element.href).toEqual('https://github.com/ChristianLisle');
    expect(img.element.src).toContain('/github.png');
    expect(img.attributes('class')).toContain('invert');
  });
});
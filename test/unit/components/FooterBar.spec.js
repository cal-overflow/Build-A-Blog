import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import FooterBar from '@/components/FooterBar.vue';
import NavItem from '@/components/NavItem.vue';

const chance = new Chance();

describe('FooterBar component', () => {
  let wrapper;
  const oldEnv = process.env;

  beforeAll(() => {
    process.env = {
      ...oldEnv,
      NUXT_ENV_GITHUB_PROFILE_URL: chance.url(),
      NUXT_ENV_YOUTUBE_CHANNEL_URL: chance.url()
    };
  });

  afterAll(() => {
    process.env = oldEnv;
  });

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

  it('renders a linked YouTube logo that is correctly styled', () => {
    const img = wrapper.findComponent('img[id="youtube-logo"]');
    expect(wrapper.findComponent('a[id="youtube-link"]').element.href).toEqual(process.env.NUXT_ENV_YOUTUBE_CHANNEL_URL);
    expect(img.element.src).toContain('/youtube.png');
    expect(img.attributes('class')).not.toContain('invert');
  });

  it('renders a linked Github logo that is correctly styled', () => {
    const img = wrapper.findComponent('img[id="github-logo"]');
    expect(wrapper.findComponent('a[id="github-link"]').element.href).toEqual(process.env.NUXT_ENV_GITHUB_PROFILE_URL);
    expect(img.element.src).toContain('/github.png');
    expect(img.attributes('class')).toContain('invert');
  });
});

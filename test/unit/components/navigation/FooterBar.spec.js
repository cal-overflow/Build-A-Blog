import { shallowMount } from '@vue/test-utils';
import generateNavigation from '../../../helpers/navigationGenerator.js';
import FooterBar from '@/components/navigation/FooterBar.vue';
import NavItem from '@/components/navigation/NavItem.vue';


describe('FooterBar component', () => {
  let navItems, wrapper, footer;

  beforeEach(() => {
    ({ footer } = generateNavigation());

    wrapper = shallowMount(FooterBar, { propsData: { content: footer } });
    navItems = wrapper.findAllComponents(NavItem);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NavItem for the each navItem passed in', () => {
      footer.navItems.forEach(({ title, href }) => {
      const navItem = navItems.filter((el) => el.text() === title).at(0);
      
      expect(navItem.exists()).toBeTruthy();
      expect(navItem.props('href')).toEqual(href);
      expect(navItem.props('active')).not.toBeTruthy();
    });
  });

  it('renders a linked YouTube logo that is correctly styled', () => {
    const img = wrapper.findComponent('img[id="youtube-logo"]');
    expect(wrapper.findComponent('a[id="youtube-link"]').element.href).toEqual(footer.imageNavItems.youtubeUrl);
    expect(img.element.src).toContain('/youtube.png');
    expect(img.attributes('class')).not.toContain('invert');
  });

  it('renders a linked Github logo that is correctly styled', () => {
    const img = wrapper.findComponent('img[id="github-logo"]');
    expect(wrapper.findComponent('a[id="github-link"]').element.href).toEqual(footer.imageNavItems.githubUrl);
    expect(img.element.src).toContain('/github.png');
    expect(img.attributes('class')).toContain('invert');
  });
});

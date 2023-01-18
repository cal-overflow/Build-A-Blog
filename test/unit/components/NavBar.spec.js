import { shallowMount } from '@vue/test-utils';
import generateNavigation from '../../helpers/navigationGenerator.js';
import NavBar from '@/components/structural/NavBar.vue';
import NavItem from '@/components/navigation/NavItem.vue';

describe('NavBar component', () => {
  let navItems, wrapper, navbar;


  beforeEach(() => {
    ({ navbar } = generateNavigation());
    
    wrapper = shallowMount(NavBar, {
      propsData: {
        currentPage: 'Home',
        content: navbar
      },
    });
    navItems = wrapper.findAllComponents(NavItem);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('correctly renders the NavItem for the signature header', () => {
    const navItem = navItems.filter((el) => el.text() === navbar.signatureNavItem.title).at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual(navbar.signatureNavItem.href);
    expect(navItem.props('active')).toBeTruthy();
  });

  it('renders a NavItem for the each navItem passed in', () => {
    navbar.navItems.forEach(({ title, href }) => {
      const navItem = navItems.filter((el) => el.text() === title).at(0);
      
      expect(navItem.exists()).toBeTruthy();
      expect(navItem.props('href')).toEqual(href);
      expect(navItem.props('active')).not.toBeTruthy();
    });
  });
});

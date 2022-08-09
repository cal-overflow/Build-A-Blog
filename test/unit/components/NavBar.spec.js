import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import NavBar from '@/components/NavBar.vue';
import NavItem from '@/components/NavItem.vue';
import CategoryDropdown from '@/components/CategoryDropdown.vue';

const chance = new Chance();
describe('NavBar component', () => {
  let navItems, wrapper;
  const oldEnv = process.env;

  beforeAll(() => {
    process.env = {
      ...oldEnv,
      NUXT_ENV_FULL_NAME: chance.name()
    };
  });

  afterAll(() => {
    process.env = oldEnv;
  });


  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      propsData: {currentPage: 'Home'},
    });
    navItems = wrapper.findAllComponents(NavItem);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NavItem for each of the links', () => {
    expect(wrapper.findAllComponents(NavItem)).toHaveLength(3);
  });

  it('correctly renders the NavItem for the signature header (home page)', () => {
    const navItem = navItems.filter((el) => el.text() === process.env.NUXT_ENV_FULL_NAME).at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/');
    expect(navItem.props('active')).toBeTruthy();
  });

  it('renders a NavItem for the blog page', () => {
    const navItem = navItems.filter((el) => el.text() === 'Blog').at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/blog');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders a NavItem for the Portfolio page', () => {
    const navItem = navItems.filter((el) => el.text() === 'Portfolio').at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/category/portfolio');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders the Category dropdown', () => {
    const dropdown = wrapper.findComponent(CategoryDropdown);
    expect(dropdown.exists()).toBeTruthy();
  });
  
  it('passes the currentPage prop into the Category dropdown component', () => {
    const dropdown = wrapper.findComponent(CategoryDropdown);
    expect(dropdown.props('currentPage')).toEqual('Home');
  });
});

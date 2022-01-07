import { shallowMount } from '@vue/test-utils';
import index from '@/pages/index.vue';
import Home from '@/components/Home.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';

describe('index page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(index);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Home');
  });

  it('contains the Home component', () => {
    expect(wrapper.findComponent(Home).exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Home'); 
  });
});
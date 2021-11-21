import { mount } from '@vue/test-utils';
import index from '@/pages/index.vue';
import Home from '@/components/Home.vue';

describe('index page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(index);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it.todo('contains the nav-bar component');

  it('contains the Home component', () => {
    expect(wrapper.findComponent(Home).exists()).toBeTruthy();
  });

  it.todo('contains the footer component');  
});
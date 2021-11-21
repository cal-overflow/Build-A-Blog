import { mount } from '@vue/test-utils';
import Home from '@/components/Home.vue';

describe('Home component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Hi, I'm Christian");
    expect(wrapper.text()).toContain("I’m a junior at Iowa State University majoring in computer science and minoring in cybersecurity engineering. I’ve worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, Roxy Seven Salon.");
    expect(wrapper.text()).toContain("I am currently working as a software developer apprentice at Source Allies. I am highly grateful for the opportunity to work for and learn from such a fantastic company.");

  });

  it.todo('contains a Preview Portfolio component');
  it.todo('contains a Blog Portfolio component');
});
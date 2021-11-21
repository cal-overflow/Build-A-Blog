import { shallowMount } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

describe('Home component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Hi, I'm Christian");
    expect(wrapper.text()).toContain("I’m a junior at Iowa State University majoring in computer science and minoring in cybersecurity engineering. I’ve worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, Roxy Seven Salon.");
    expect(wrapper.text()).toContain("I am currently working as a software developer apprentice at Source Allies. I am highly grateful for the opportunity to work for and learn from such a fantastic company.");

  });

  it('contains a PortfolioPreview component', () => {
    expect(wrapper.findComponent(PortfolioPreview).exists()).toBeTruthy();
  });

  it('contains a BlogPreview component', () => {
    expect(wrapper.findComponent(BlogPreview).exists()).toBeTruthy();
  });
});
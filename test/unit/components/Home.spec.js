import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

describe('Home component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'nuxt-content': true,
      },
      propsData: {
        about: undefined
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains an image with the correct source', () => {
    const image = wrapper.find('img[alt="Headshot"]');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes().src).toContain('headshot.jpg');
  });

  it('contains the correct introduction', () => {
    expect(wrapper.text()).toContain("Hi. I'm Christian. 👋");
  });

  it('contains a PortfolioPreview component', () => {
    expect(wrapper.findComponent(PortfolioPreview).exists()).toBeTruthy();
  });

  it('contains a BlogPreview component', () => {
    expect(wrapper.findComponent(BlogPreview).exists()).toBeTruthy();
  });
});
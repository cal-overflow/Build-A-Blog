import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

describe('Home component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains an image with the correct source', () => {
    const image = wrapper.find('img[alt="Christian Headshot"]');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes().src).toContain('Christian_headshot.jpg');
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Hi. I'm Christian. 👋");
    expect(wrapper.text()).toContain("I'm a software engineer and junior at Iowa State University studying computer science. I've worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, Roxy Seven Salon.");
    expect(wrapper.text()).toContain("I'm not one for writing an extensive bio; besides, I think a lot of my work speaks for itself. Have a look around my portfolio to get a good sense of my work.");
    expect(wrapper.text()).toContain("If you have any questions while viewing my website or simply want to get in touch, please feel free to reach out to me.");

  });

  it('contains a PortfolioPreview component', () => {
    expect(wrapper.findComponent(PortfolioPreview).exists()).toBeTruthy();
  });

  it('contains a BlogPreview component', () => {
    expect(wrapper.findComponent(BlogPreview).exists()).toBeTruthy();
  });
});
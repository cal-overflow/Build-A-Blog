import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import PortfolioPreview from '@/components/previews/Portfolio.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('PortfolioPreview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PortfolioPreview, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Portfolio");
    expect(wrapper.text()).toContain("You'll find my most remarkable projects and software development experiences in my portfolio. This varies from a complex real-time web-based multiplayer game to simple websites for local businesses.");
  });

  it('contains a Divider component', () => {
    expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
  });

  it('contains a NavItem link to the portfolio', () => {
    const portfolioLink = wrapper.findComponent(NavItem);
    expect(portfolioLink.exists()).toBeTruthy();
    expect(portfolioLink.props('title')).toEqual('View my work');
    expect(portfolioLink.props('href')).toEqual('/category/portfolio');
  });

});
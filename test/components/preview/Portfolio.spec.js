import { shallowMount } from '@vue/test-utils';
import PortfolioPreview from '@/components/previews/Portfolio.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('PortfolioPreview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PortfolioPreview);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct text', () => {
    expect(wrapper.text()).toContain("Portfolio");
    expect(wrapper.text()).toContain("In my portfolio, you’ll find my most remarkable projects and software development experiences. This varies from a complex real-time web-based multiplayer game to a simple website for a local business. Most of these projects were made for school courses, but some were created for business.");
  });

  it('contains a Divider component', () => {
    expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
  });

  it('contains a NavItem link to the portfolio', () => {
    const portfolioLink = wrapper.findComponent(NavItem);
    expect(portfolioLink.exists()).toBeTruthy();
    expect(portfolioLink.props('title')).toEqual('View my work');
    expect(portfolioLink.props('href')).toEqual('/portfolio');
  });

});
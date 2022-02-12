import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import PortfolioPreview from '@/components/previews/Portfolio.vue';
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

describe('PortfolioPreview component', () => {
  let wrapper;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn().mockReturnThis(),
    catch: () => {}
  };

  beforeEach(() => {
    wrapper = shallowMount(PortfolioPreview, {
      stubs: {
        NuxtLink: RouterLinkStub,
        'nuxt-content': true,
      },
      mocks: {
        $content: () => nuxtContentMock
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains the correct header', () => {
    expect(wrapper.text()).toContain("Portfolio");
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
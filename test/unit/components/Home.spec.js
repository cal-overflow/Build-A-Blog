import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import Home from '@/components/Home.vue';
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

const chance = new Chance();

describe('Home component', () => {
  let wrapper;
  const oldEnv = process.env;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn().mockReturnThis(),
    catch: () => {}
  };

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
    wrapper = shallowMount(Home, {
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

  it('contains an image with the correct source', () => {
    const image = wrapper.find('img[alt="Headshot"]');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes().src).toContain('headshot.png');
  });

  it('contains the correct introduction', () => {
    expect(wrapper.text()).toContain(`Hi. I'm ${process.env.NUXT_ENV_FULL_NAME.split(' ')[0]}. 👋`);
  });

  it('contains a PortfolioPreview component', () => {
    expect(wrapper.findComponent(PortfolioPreview).exists()).toBeTruthy();
  });

  it('contains a BlogPreview component', () => {
    expect(wrapper.findComponent(BlogPreview).exists()).toBeTruthy();
  });
});
import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import Home from '@/components/Home.vue';
import PagePreview from '@/components/previews/Page.vue';

const chance = new Chance();

describe('Home component', () => {
  let wrapper, blogPreview, portfolioPreview;
  const oldEnv = process.env;

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
    blogPreview = {
      body: chance.paragraph()
    };

    portfolioPreview = {
      body: chance.paragraph()
    };

    wrapper = shallowMount(Home, {
      stubs: {
        'nuxt-content': true,
      },
      propsData: { blogPreview, portfolioPreview }
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

  it('contains two PagePreview components', () => {
    expect(wrapper.findAllComponents(PagePreview)).toHaveLength(2);
  });

  it('passes the portfolio content into one of the PagePreview components', () => {
    expect(wrapper.findAllComponents(PagePreview).wrappers[0].props('content')).toMatchObject(portfolioPreview);
  });

  it('passes the blogPreview content into one of the PagePreview components', () => {
    expect(wrapper.findAllComponents(PagePreview).wrappers[1].props('content')).toMatchObject(blogPreview);
  });
});

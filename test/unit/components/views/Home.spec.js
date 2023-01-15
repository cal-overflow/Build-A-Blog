import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import Home from '@/components/views/Home.vue';
import Card from '@/components/helpers/Card.vue';

const chance = new Chance();

describe('Home view component', () => {
  let wrapper, portfolioPreview, blogPreview, metadata, dir, content;

  beforeEach(() => {
    metadata = {
      title: chance.string(),
      primaryView: 'home-view',
      secondaryView: 'none',
      viewProperties: {
        headshotImage: "https://picsum.photos/400"
      }
    };

    dir = `/${chance.string({ pool: 'abc' })}`;

    blogPreview = {
      body: chance.paragraph()
    };
    portfolioPreview = {
      body: chance.paragraph()
    };

    content = [ blogPreview, portfolioPreview ];

    wrapper = shallowMount(Home, {
      stubs: {
        'nuxt-content': true,
      },
      propsData: { metadata, content, dir }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains an image with the correct source', () => {
    const image = wrapper.find('img[alt="Headshot"]');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes().src).toContain(metadata.viewProperties.headshotImage);
  });

  it('contains two Card components', () => {
    expect(wrapper.findAllComponents(Card)).toHaveLength(2);
  });

  it('passes the blog-preview content into one of the components', () => {
    expect(wrapper.findAllComponents(Card).wrappers[0].props('content')).toMatchObject(blogPreview);
  });

  it('passes the portfolio-preview content into one of the PagePreview components', () => {
    expect(wrapper.findAllComponents(Card).wrappers[1].props('content')).toMatchObject(portfolioPreview);
  });
});

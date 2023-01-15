import { mount, RouterLinkStub } from '@vue/test-utils';
import generatePost from '../../helpers/postGenerator';
import Card from '@/components/helpers/Card.vue';

describe('Card component', () => {
  let wrapper, content;

  const stubs = {
    'NuxtLink': RouterLinkStub,
    'nuxt-content': true,
  };
  
  beforeEach(() => {
    content = generatePost();
    wrapper = mount(Card, {
      stubs,
      mocks: { content }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains nuxt content element for the excerpt', () => {
    expect(wrapper.html()).toContain('<nuxt-content-stub');
  });
});

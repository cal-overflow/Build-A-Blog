import { mount, RouterLinkStub } from '@vue/test-utils';
import generatePost from '../../../helpers/postGenerator';
import ContentCard from '@/components/cards/ContentCard.vue';

describe('ContentCard component', () => {
  let wrapper, content;

  const stubs = {
    'NuxtLink': RouterLinkStub,
    'nuxt-content': true,
  };
  
  beforeEach(() => {
    content = generatePost();
    wrapper = mount(ContentCard, {
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

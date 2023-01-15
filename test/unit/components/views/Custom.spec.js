import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import CustomView from '@/components/views/Custom.vue';

const chance = new Chance();

describe('Custom View component', () => {
  let wrapper, content;

  beforeEach(() => {
    content = [
      {
      body: chance.paragraph()
      }
    ];

    wrapper = shallowMount(CustomView, {
      stubs: {
        'nuxt-content': true,
      },
      propsData: { content }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains nuxt-content element', () => {
    expect(wrapper.html()).toContain('<nuxt-content-stub');
  });
});

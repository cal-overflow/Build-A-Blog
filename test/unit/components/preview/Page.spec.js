import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import PagePreview from '@/components/previews/Page.vue';

const chance = new Chance();

describe('PagePreview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PagePreview, {
      stubs: {
        'nuxt-content': true
      },
      propsData: {
        content: {
          body: `${chance.sentence()}\n\n${chance.paragraph()}`}
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the nuxt-content', () => {
    expect(wrapper.html()).toContain('<nuxt-content-stub');
  });

  describe('given the content prop is not yet passed in', () => {
    beforeEach(() => {
      wrapper = shallowMount(PagePreview, {
        stubs: {
          'nuxt-content': true
        },
        props: {
          content: undefined
        }
      });
    });

    it('renders the lazy load content', () => {
      expect(wrapper.html()).toContain('class="page-preview-lazy"');
    });

    it('does not render the nuxt-content', () => {
      expect(wrapper.html()).not.toContain('<nuxt-content-stub');
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import BasicCard from '@/components/cards/Basic.vue';

const chance = new Chance();

describe('PagePreview component', () => {
  let wrapper, slotContent;

  
  beforeEach(() => {
    slotContent = `${chance.sentence()}\n\n${chance.paragraph()}`;
    wrapper = shallowMount(BasicCard, {
      slots: {
        default: slotContent
      },
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the slot content', () => {
    expect(wrapper.text()).toContain(slotContent);
  });
});

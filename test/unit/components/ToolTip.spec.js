import { mount } from '@vue/test-utils';
import Chance from 'chance';
import ToolTip from '@/components/helpers/ToolTip.vue';

const chance = new Chance();

describe('ToolTip component', () => {
  let wrapper, fakeText, fakeMaxLength;

  beforeEach(() => {
    fakeMaxLength = chance.integer({ min: 50, max: 70 });
    fakeText = chance.string({ length: (fakeMaxLength + 10) });

    wrapper = mount(ToolTip, {
      propsData: {
        text: fakeText,
        maxLength: fakeMaxLength,
        classes: "",
      }
    });
  });

  afterEach(jest.clearAllMocks);

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('shows the correct text', () => {
    const showEllipsis = (fakeText.length - 3) > fakeMaxLength;
    const showingString =  `${fakeText.substring(0, fakeMaxLength + 3)}${showEllipsis ? '...' : ''}`;
    expect(wrapper.text()).toContain(showingString);
  });
});

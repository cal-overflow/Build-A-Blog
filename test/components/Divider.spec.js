import { mount } from '@vue/test-utils';
import Chance from 'chance';
import Divider from '@/components/Divider.vue';

const chance = new Chance();

describe('Divider component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Divider);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('contains a horizontal rule (HR)', () => {
    expect(wrapper.html()).toContain('<hr');
  });

  it('has the correct default color and width', () => {
    expect(wrapper.html()).toContain('bg-gray-200 text-gray-200');
    expect(wrapper.html()).toContain('w-1/4');
  });

  it('correctly passes the width and color from props', () => {
    const fakeWidth = `w-1/${2 * chance.integer({min: 1, max: 4})}`;
    const fakeColor = `red-${chance.color()}-${100 * chance.integer({min: 1, max: 9})}`;

    wrapper= mount(Divider, {
      propsData: {
        width: fakeWidth,
        color: fakeColor,
      }
    });

    const expectedTailwindClasses = `bg-${fakeColor} text-${fakeColor} ${fakeWidth}`;
    expect(wrapper.html()).toContain(expectedTailwindClasses);
  });
});
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

  it('has the correct color and default width', () => {
    expect(wrapper.html()).toContain('bg-extra-gray-light text-extra-gray-light dark:bg-extra-gray-dark dark:text-extra-gray-light');
    expect(wrapper.html()).toContain('w-1/4');
  });

  it('correctly passes the width from props', () => {
    const fakeWidth = `w-1/${2 * chance.integer({min: 1, max: 4})}`;

    wrapper= mount(Divider, {
      propsData: {
        width: fakeWidth,
      }
    });

    expect(wrapper.html()).toContain(fakeWidth);
  });
});

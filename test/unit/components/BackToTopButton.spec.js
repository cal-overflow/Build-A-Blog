import { mount } from '@vue/test-utils';
import Chance from 'chance';
import BackToTopButton from '@/components/BackToTopButton.vue';

const chance = new Chance();

describe('BackToTopButton component', () => {
  let wrapper;

  const expectedCutoff = 1200;
  beforeEach(() => {
    wrapper = mount(BackToTopButton);
  });

  it('has the correct default value of isVisible', () => {
    expect(wrapper.vm.isVisible).not.toBeTruthy();
  });

  it('has the correct visibleCutoff value', () => {
    expect(wrapper.vm.visibleCutoff).toEqual(expectedCutoff);
  });

  it('has the correct default (scale: 0) dynamic style classes', () => {
    expect(wrapper.vm.dynamicStyles).toEqual('scale-0');
  });

  describe('given the user scrolls below the visible cutoff', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: expectedCutoff + chance.integer({ min: 1 }),
      });

      Object.defineProperty(document, 'body', {
        writable: true,
        configurable: true,
        value: {
          offsetHeight: 100
        }
      });

      window.dispatchEvent(new Event('scroll'));
    });

    it('correctly updates the dynamicStyles value to zoom in animation', () => {
      expect(wrapper.vm.dynamicStyles).toEqual('motion-safe:animate-zoom-in-fast');
    });

    describe('given the user scrolls back up to above the visible cutoff', () => {
      beforeEach(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: expectedCutoff - chance.integer({ min: 1, max: expectedCutoff }),
        });

        Object.defineProperty(document, 'body', {
          writable: true,
          configurable: true,
          value: {
            offsetHeight: 100
          }
        });

        window.dispatchEvent(new Event('scroll'));
      });

      it('correctly updates the dynamicStyles to zoom out animation', () => {
        expect(wrapper.vm.dynamicStyles).toEqual('motion-safe:animate-zoom-out-fast scale-0');
      });
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import NavItem from '@/components/navigation/NavItem.vue';
import TagDropdown from '@/components/navigation/TagDropdown.vue';
import TagList from '@/components/navigation/TagList.vue';

const chance = new Chance();

describe('TagDropdown component', () => {
  let navItems, wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TagDropdown);
    navItems = wrapper.findAllComponents(NavItem);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('correctly renders the NavItem for the "Tags" dropdown', () => {
    const navItem = navItems.filter((el) => el.text().includes('Tags')).at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/tags');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders the navItem as active given the currentPage is "Tags"', () => {
    wrapper = shallowMount(TagDropdown, { propsData: { currentPage: 'Tags' } });
    navItems = wrapper.findAllComponents(NavItem);

    const navItem = navItems.filter((el) => el.text().includes('Tags')).at(0);
    expect(navItem.props('active')).toBeTruthy();
  });

  it('renders the TagList component (and is invisible by default)', () => {
    expect(wrapper.findComponent(TagList).exists()).toBeTruthy();
  });
  
  it('TagList component is not visible by default', () => {
    expect(wrapper.findComponent(TagList).isVisible()).not.toBeTruthy();
  });

  it('TagList component is rendered with correct currentPage prop', () => {
    const fakeCurrentPage = chance.string();
    wrapper = shallowMount(TagDropdown, { propsData: { currentPage: fakeCurrentPage } });
    expect(wrapper.findComponent(TagList).props('currentPage')).toEqual(fakeCurrentPage);
  });

  describe('hovering over the "Tags" navItem', () => {
    beforeEach(async () => {
      wrapper.trigger("mouseenter");
      await wrapper.vm.$nextTick();
    });

    it('Makes the TagList visible', () => {
      expect(wrapper.findComponent(TagList).isVisible()).toBeTruthy();
    });

    describe('given a user stops hovering over the component', () => {
      beforeEach(async () => {
        wrapper.trigger("mouseleave");
        await wrapper.vm.$nextTick();
      });

      it('resests to invisible after stopping hover', () => {
        expect(wrapper.findComponent(TagList).isVisible()).not.toBeTruthy();
      });
    });
  });
});

import { mount } from '@vue/test-utils';
import Chance from 'chance';
import generateCategory from '../../helpers/categoryGenerator';
import CategoryList from '@/components/CategoryList.vue';

const chance = new Chance();
const categoryLimit = 10;

describe('CategoryList component', () => {
  let wrapper, fakeCategories;

  const stubs = {
    'nuxt-link': true,
    'nuxt-content': true,
    'nav-item': true,
  };

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    fakeCategories = chance.n(generateCategory, chance.integer({
      min: 1, max: categoryLimit
    }));

    wrapper = mount(CategoryList, {
      data: () => ({
        categories: fakeCategories,
      }),
      mocks: {
        $content: () => nuxtContentMock
      },
      stubs,
    });
  });

  afterEach(jest.clearAllMocks); 

  it('renders a NavItem component for each of the categories', () => {
    fakeCategories.forEach((category) => {
      expect(wrapper.findComponent({ name: 'nav-item', ref: category.slug }).exists()).toBeTruthy();
    });
  });

  it('renders each NavItem component with the category title', () => {
    fakeCategories.forEach((category) => {
      expect(wrapper.findComponent({ ref: category.slug }).text()).toEqual(category.title);
    });
  });

  it('Renders each NavItem component with the correct href', () => {
    fakeCategories.forEach((category) => {
      expect(wrapper.findComponent({ ref: category.slug }).attributes('href')).toEqual(`/category/${category.slug}`);
    });
  });
});

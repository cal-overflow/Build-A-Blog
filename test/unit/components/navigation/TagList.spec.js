import { mount } from '@vue/test-utils';
import Chance from 'chance';
import generateTag from '../../../helpers/tagGenerator';
import TagList from '@/components/navigation/TagList.vue';

const chance = new Chance();
const tagLimit = 10;

describe('TagList component', () => {
  let wrapper, fakeTags;

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
    fakeTags = chance.n(generateTag, chance.integer({
      min: 1, max: tagLimit
    }));

    wrapper = mount(TagList, {
      data: () => ({
        tags: fakeTags,
      }),
      mocks: {
        $content: () => nuxtContentMock
      },
      stubs,
    });
  });

  afterEach(jest.clearAllMocks); 

  it('renders a NavItem component for each of the tags', () => {
    fakeTags.forEach((tag) => {
      expect(wrapper.findComponent({ name: 'nav-item', ref: tag.slug }).exists()).toBeTruthy();
    });
  });

  it('renders each NavItem component with the tag title', () => {
    fakeTags.forEach((tag) => {
      expect(wrapper.findComponent({ ref: tag.slug }).text()).toEqual(tag.title);
    });
  });

  it('Renders each NavItem component with the correct href', () => {
    fakeTags.forEach((tag) => {
      expect(wrapper.findComponent({ ref: tag.slug }).attributes('href')).toEqual(`/tags/${tag.slug}`);
    });
  });
});

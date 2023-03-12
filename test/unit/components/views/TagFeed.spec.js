import { mount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import generateTag from '../../../helpers/tagGenerator.js';
import TagFeed from '@/components/views/TagFeed.vue';
import TagPreview from '@/components/previews/Tag.vue';
import Divider from '@/components/misc/Divider.vue';

const chance = new Chance();

describe('TagFeed component', () => {
  let wrapper, fakePath, fakeTags;

  const stubs = {
    NuxtLink: RouterLinkStub,
    'nuxt-content': true,
  };

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    sortBy: jest.fn().mockReturnThis(),
    fetch: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };


  beforeEach(() => {
    fakePath = `/${chance.string({ pool: 'abcdef' })}`;
    wrapper = mount(TagFeed, {
      mocks: {
        $content: () => nuxtContentMock
      },
      propsData: {
        path: fakePath
      },
      stubs
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  describe('given the tags have not loaded yet', () => {
    beforeEach(() => {
      // mock nuxt content fetch to never resolve (stuck loading behavior)      
      nuxtContentMock.fetch.mockReturnValue(new Promise(() => ({})));

      wrapper = mount(TagFeed, {
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders TagPreview components with no post prop', () => {
      const tagPreviews = wrapper.findAllComponents(TagPreview);

      tagPreviews.wrappers.forEach((wrapper) => {
        expect(wrapper.props('tag')).toEqual(undefined);
      });
    });
  });

  describe('given there are no tags', () => {
    beforeEach(() => {
      fakeTags = [];
      wrapper = mount(TagFeed, {
        data: () => ({
          tags: [],
          isDoneFetchingTags: true
        }),
        mocks: {
          $content: () => nuxtContentMock
        },
        stubs,
      });
    });

    it('renders a "no tags" message', () => {
      expect(wrapper.text()).toContain('There are not currently any tags');
    });
  });

  describe('given there are tags', () => {
    beforeEach(() => {
      fakeTags = chance.n(generateTag, chance.integer({
        min: 1, max: 20
      }));

      nuxtContentMock.fetch.mockResolvedValue({ tags: fakeTags });

      wrapper = mount(TagFeed, {
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

    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it('contains the correct text', () => {
      expect(wrapper.text()).toContain("Tags");
    });

    it('contains a Divider component', () => {
      expect(wrapper.findComponent(Divider).exists()).toBeTruthy();
    });

    it('renders a component for each tag', () => {
      fakeTags.forEach((tag) => {
        expect(wrapper.findComponent({ ref: tag.slug })).toBeTruthy();
      });
    });

    it('renders the correct number of TagPreview components', () => {
      expect(wrapper.findAllComponents(TagPreview).wrappers).toHaveLength(fakeTags.length);
    });
  });

  // describe('given there is an issue fetching tags', () => {
  //   let mockErrorFn, fakeError;

  //   beforeEach(async () => {
  //     fakeTags = [];
  //     fakeError = new Error(chance.sentence());
  //     mockErrorFn = jest.fn();

  //     nuxtContentMock.fetch.mockImplementation(() => {
  //       return {
  //         catch: (callback) => {
  //           callback(fakeError);
  //           return fakeTags;
  //         }
  //       };
  //     });

  //     wrapper = mount(TagFeed, {
  //       data: () => ({
  //         tags: [],
  //       }),
  //       mocks: {
  //         $content: () => nuxtContentMock
  //       },
  //       stubs: {
  //         'nuxt-content': true
  //       }
  //     });
  //     await TagFeed.fetch();

  //   });

  //   it('invokes the nuxt error function correctly', () => {
  //     expect(mockErrorFn).toBeCalled();
  //     expect(mockErrorFn).toBeCalledWith({
  //       statusCode: 500,
  //       message: 'Something went wrong while fetching tags',
  //       error: fakeError
  //     });
  //   });
  // });
});

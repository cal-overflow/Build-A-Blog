import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Chance from "chance";
import generatePost from '../../helpers/postGenerator';
import PostView from '@/components/views/Post.vue';

const chance = new Chance();

describe('post component', () => {
  let wrapper, fakeRoute;
  const post = generatePost();

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(() => {
    fakeRoute = chance.string();

    wrapper = shallowMount(PostView, {
      stubs: {
        'nuxt-content': true,
        NuxtLink: RouterLinkStub,
      },
      propsData: { fakeRoute, dir: chance.string(), content: generatePost() },
      mocks: {
        $content: () => nuxtContentMock
      },
    });

    nuxtContentMock.fetch.mockResolvedValue(post);
  });

  afterEach(jest.clearAllMocks); 

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // TODO
  // it('renders the post title and date correctly', () => {
  //   expect(wrapper.text()).toContain(post.title);
  //   expect(wrapper.text()).toContain(post.date);
  // });

  // it('renders the post tags correctly', () => {
  //   expect(wrapper.text()).toContain(post.title);
  //   expect(wrapper.text()).toContain(post.date);
    
  //   post.tags.forEach((tag) => {
  //     expect(wrapper.text()).toContain(tag);
  //   });
  // });

  // it('renders the post tags with the correct link', () => {
  //   const linkComponents = wrapper.findAllComponents(RouterLinkStub);

  //   post.tags.forEach((tag) => {
  //     const expectedPath = `/tags/${tag.toLowerCase().replace(' ', '-')}`;

  //     const component = linkComponents.wrappers.find((el) => el.text() === tag);
  //     expect(component.props('to')).toEqual(expectedPath);
  //   });
  // });

  // it('renders the post feature image correctly', () => {
  //   expect(wrapper.html()).toContain(`<img id="post-feature-image" src="${post.img}"`);
  // });

  // it('contains nuxt content element for the post body', () => {
  //   expect(wrapper.html()).toContain('<nuxt-content-stub');
  // });
});

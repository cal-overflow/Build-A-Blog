import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import generateNavigation from '../../helpers/navigationGenerator.js';
import contact from '@/pages/contact.vue';
import ContactForm from '@/components/forms/ContactForm.vue';
import NavBar from '@/components/structural/NavBar.vue';
import FooterBar from '@/components/structural/FooterBar.vue';

describe('contact page', () => {
  let wrapper, content;

  const stubs = {
    NuxtLink: RouterLinkStub,
    'nuxt-content': true,
  };

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(async () => {
    content = generateNavigation();
    nuxtContentMock.fetch.mockResolvedValue([content]);

    const data = await contact.asyncData({
      $content: () => nuxtContentMock,
      error: jest.fn()
    });

    contact.data = () => (data);
    wrapper = shallowMount(contact, {
      mocks: {
        $content: () => nuxtContentMock
      },
      stubs,
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Contact');
  });

  it('contains the PostFeed component', () => {
    expect(wrapper.findComponent(ContactForm).exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Contact'); 
  });
});

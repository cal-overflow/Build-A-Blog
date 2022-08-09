import { shallowMount } from '@vue/test-utils';
import contact from '@/pages/contact.vue';
import ContactForm from '@/components/ContactForm.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';

describe('contact page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(contact);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Contact');
  });

  it('contains the BlogFeed component', () => {
    expect(wrapper.findComponent(ContactForm).exists()).toBeTruthy();
  });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Contact'); 
  });
});

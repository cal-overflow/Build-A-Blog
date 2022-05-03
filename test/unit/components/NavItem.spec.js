import { mount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import NavItem from '@/components/NavItem.vue';

const chance = new Chance();

describe('NavItem component', () => {
  let wrapper, nuxtLink, fakeTitle, fakeLink;

  beforeEach(() => {
    fakeTitle = chance.string();
    fakeLink = chance.url();
    wrapper = mount(NavItem, {
      propsData: {
        title: fakeTitle,
        href: fakeLink,
        active: false,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      }
    });
    nuxtLink = wrapper.findComponent(RouterLinkStub);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders a NuxtLink', () => {
    expect(nuxtLink.exists()).toBeTruthy();
  });

  it('renders the NuxtLink with the correct text', () => {
    expect(nuxtLink.findComponent(RouterLinkStub).text()).toEqual(fakeTitle);
  });
  
  it('renders the Nuxt Link with the correct url/href', () => {
    expect(nuxtLink.props('to')).toEqual(fakeLink);
  });

  it('has the correct classes (styling) when not on current page', () => {
    expect(nuxtLink.html()).toContain('class="p-3 hover:underline align-middle transition dark:text-white"');
    expect(nuxtLink.html()).not.toContain('text-primary-light');
  });

  it('has the correct classes (styling) when on current page', async () => {
    await wrapper.setProps({active: true});
    nuxtLink = wrapper.findComponent(RouterLinkStub);

    expect(nuxtLink.html()).toContain('class="p-3 hover:underline align-middle transition text-primary-light dark:text-primary-dark"');
  });
});

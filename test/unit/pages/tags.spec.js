import { shallowMount } from '@vue/test-utils';
import tags from '@/pages/tags.vue';
import NavBar from '@/components/structural/NavBar.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
// import TagFeed from '@/components/views/TagFeed.vue';


describe('tags page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(tags);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Tags');
  });

  // it('renders the TagFeed component with the correct props', () => {
  //   const tagFeed = wrapper.findComponent(TagFeed);
  //   expect(tagFeed.exists()).toBeTruthy();
  //   expect(tagFeed.props('path')).toEqual('tags');
  // });

  it('contains the FooterBar component', () => {
    const footer = wrapper.findComponent(FooterBar);
    expect(footer.exists()).toBeTruthy();
    expect(footer.props('currentPage')).toEqual('Tags');
  });
});

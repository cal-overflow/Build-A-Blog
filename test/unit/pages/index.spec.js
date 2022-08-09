import { shallowMount } from '@vue/test-utils';
import Chance from 'chance';
import index from '@/pages/index.vue';
import Home from '@/components/Home.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';

const chance = new Chance();

describe('index page', () => {
  let wrapper, bio, portfolio, blog;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };

  beforeEach(async () => {
    bio = {
      slug: 'about',
      body: chance.paragraph()
    };
    portfolio = {
      slug: 'portfolio-preview',
      body: chance.paragraph()
    };
    blog = {
      slug: 'blog-preview',
      body: chance.paragraph()
    };

    nuxtContentMock.fetch.mockResolvedValue([ bio, portfolio, blog ]);

    const data = await index.asyncData({
      $content: () => nuxtContentMock,
      error: jest.fn()
    });

    index.data = () => (data);

    wrapper = shallowMount(index);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders the NavBar component with the correct props', () => {
    const navBar = wrapper.findComponent(NavBar);
    expect(navBar.exists()).toBeTruthy();
    expect(navBar.props('currentPage')).toEqual('Home');
  });
  
    it('contains the FooterBar component', () => {
      const footer = wrapper.findComponent(FooterBar);
      expect(footer.exists()).toBeTruthy();
      expect(footer.props('currentPage')).toEqual('Home'); 
    });

  it('contains the Home component', () => {
    expect(wrapper.findComponent(Home).exists()).toBeTruthy();
  });

  it('passes the bio content into the home component', () => {
    expect(wrapper.findComponent(Home).props('bio')).toMatchObject(bio);
  });

  it('passes the portfolio content into the home component', () => {
    expect(wrapper.findComponent(Home).props('portfolioPreview')).toMatchObject(portfolio);
  });

  it('passes the blog content into the home component', () => {
    expect(wrapper.findComponent(Home).props('blogPreview')).toMatchObject(blog);
  });
});

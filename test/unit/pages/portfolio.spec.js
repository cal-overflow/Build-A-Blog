import portfolio from '@/pages/portfolio.vue';

describe('portfolio page', () => {
  let redirect;

  beforeEach(() => {
    redirect = jest.fn();

    portfolio.asyncData({ redirect });
  });

  it('redirects to the portfolio category page', () => {
    expect(redirect).toBeCalledWith('/category/portfolio');
  });
});

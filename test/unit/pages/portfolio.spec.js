import portfolio from '@/pages/portfolio.vue';

describe('portfolio page', () => {
  let redirect;

  beforeEach(() => {
    redirect = jest.fn();

    portfolio.asyncData({ redirect });
  });

  it('redirects to the portfolio tag page', () => {
    expect(redirect).toBeCalledWith('/tag/portfolio');
  });
});

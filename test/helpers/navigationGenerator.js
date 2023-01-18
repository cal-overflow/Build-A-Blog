import Chance from 'chance';

const chance = new Chance();

const generateMockNavItem = () => ({
  title: chance.string(),
  href: chance.bool() ? `/${chance.string({ pool: 'abc123' })}` : chance.url()
});

const generateNavigation = () => ({
  navbar: {
    signatureNavItem: generateMockNavItem(),
    navItems: chance.n(generateMockNavItem, chance.integer({ min: 1, max: 6 }))
  },
  footer: {
    navItems: chance.n(generateMockNavItem, chance.integer({ min: 1, max: 6 })),
    imageNavItems: {
      youtubeUrl: chance.url(),
      githubUrl: chance.url(),
    }
  }
});

export default generateNavigation;

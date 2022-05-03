import Chance from "chance";

const chance = new Chance();

const generatePost = () => ({
  "id": chance.integer({ min: 1, max: 100 }),
  "dir": `/${chance.string()}`,
  "slug": chance.string(),
  "path": `/${chance.string}/${chance.string()}`,
  "extension": ".md",
  "title": chance.sentence({words: chance.integer({min: 2, max: 5})}),
  "description": chance.paragraph(),
  "excerpt": generateExcerpt(),
  "date": chance.date({string: true}),
  "img": "https://picsum.photos/400",
  "categories": chance.n(chance.word, chance.integer({min: 1, max: 10})),
});

const generateExcerpt = () => ({
  "type": "root",
  "children": [
    {
      "type": "element",
      "tag": "p",
      "props": {},
      "children": [
        {
          "type": "text",
          "value": chance.paragraph(),
        },
      ]
    },
  ],
});


export default generatePost;

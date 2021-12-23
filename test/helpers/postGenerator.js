import Chance from "chance";

const chance = new Chance();

const generatePost = () => ({
  "dir": `/${chance.string()}`,
  "slug": chance.string(),
  "path": `/${chance.string}/${chance.string()}`,
  "extension": ".md",
  "title": chance.sentence({words: chance.integer({min: 2, max: 5})}),
  "description": chance.paragraph(),
  "excerpt": generateExcerpt(),
  "img": "https://picsum.photos/400",
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
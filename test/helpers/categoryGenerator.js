import Chance from "chance";

const chance = new Chance();

const generateCategory = () => ({
    "title": chance.string(),
    "slug": chance.string(),
    "description": chance.string(),
});

export default generateCategory;

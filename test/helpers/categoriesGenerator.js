import Chance from "chance";

const chance = new Chance();

const generateCategories = () => ({
    "title": chance.string(),
    "slug": chance.string(),
    "description": chance.string(),
});

export default generateCategories;

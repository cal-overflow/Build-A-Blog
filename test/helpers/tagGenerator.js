import Chance from "chance";

const chance = new Chance();

const generateTag = () => ({
    "title": chance.string(),
    "slug": chance.string(),
    "description": chance.string(),
});

export default generateTag;

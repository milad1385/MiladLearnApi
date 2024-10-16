const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: { type: "string", min: 1, max: 50 },
  category: { type: "objectID" },
  body: { type: "string", min: 1, max: 10000 },
  tags: { type: "string", min: 1, max: 100 },
  href: { type: "string", min: 1, max: 100 },
  description: { type: "string", min: 1, max: 1000 },
};

const check = v.compile(schema);

module.exports = check;

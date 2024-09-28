const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: { type: "string", min: 1, max: 100 },
  description: { type: "string", min: 1, max: 1000 },
  href: { type: "string", min: 1, max: 100 },
  price: { type: "string", min: 1, max: 100 },
  discount: { type: "string", optional: true, min: 1, max: 100 },
  status: { type: "string", min: 1, max: 100 },
  support: { type: "string", min: 1, max: 100 },
  category: { type: "string", min: 1, max: 100 },

};

const check = v.compile(schema);

module.exports = check;

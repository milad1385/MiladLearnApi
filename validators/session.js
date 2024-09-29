const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: { type: "string", min: 1, max: 100 },
  href: { type: "string", min: 1, max: 1000 },
  time: { type: "string", min: 1, max: 100 },
  free: { type: "string", min: 1, max: 100 },
};

const check = v.compile(schema);

module.exports = check;

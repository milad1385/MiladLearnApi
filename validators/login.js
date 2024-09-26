const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  identifier: { type: "string", min: 2, max: 100 },
  password: { type: "string", min: 3, max: 40 },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;

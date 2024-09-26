const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: { type: "string", min: 2, max: 100 },
  username: { type: "string", min: 2, max: 100 },
  email: { type: "string", min: 4, max: 150 },
  phone: { type: "string"},
  password: { type: "string", min: 3, max: 40 },
  confirmedPassword: { type: "equal", field: "password" },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;

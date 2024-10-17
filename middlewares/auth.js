const UserModel = require("./../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ");

    if (token?.length < 2) {
      return res.status(422).json({ message: "the token format is not valid" });
    }

    const accessToken = token?.[1];

    if (!accessToken) {
      return res.status(422).json({ message: "the token format is not valid" });
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ message: "user is unathorized !!!" });
    }

    console.log(payload);
    

    const user = await UserModel.findOne({ _id: payload.id });

    if (!user) {
      return res.status(404).json({ message: "user is not found !!!" });
    }

    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

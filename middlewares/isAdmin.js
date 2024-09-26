module.exports = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === "ADMIN";

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "this route is protected just for admins" });
    }

    next();
  } catch (error) {
    next();
  }
};

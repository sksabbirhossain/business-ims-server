const jwt = require("jsonwebtoken");

const EXPIRE_TIME = 60 * 1000;

//check login user
const checkUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded?._id) {
      const userInfo = {
        picture_info: decoded?.picture_info,
        _id: decoded?._id,
        storeName: decoded?.storeName,
        ownerName: decoded?.ownerName,
        phone: decoded?.phone,
        email: decoded?.email,
        role: decoded?.role,
        createdAt: decoded?.createdAt,
        updatedAt: decoded?.updatedAt,
        __v: decoded?.__v,
      };
      //create accessToken
      const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      //create refreshToken
      const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME);

      res.status(200).json({
        status: 200,
        accessToken,
        refreshToken,
        expiresIn,
      });
    } else {
      res.status(401).json({ status: 401, message: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ status: 401, message: "unauthorized" });
  }
};

module.exports = {
  checkUser,
};

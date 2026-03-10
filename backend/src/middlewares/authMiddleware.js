import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ApiResponse from "../utils/apiResponse.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_Scret);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(404)
          .json(
            new ApiResponse(
              404,
              "error",
              "User not found with this token",
              null,
            ),
          );
      }

      next();
    } catch (error) {
      console.error("Auth Error:", error.message);
      return res
        .status(401)
        .json(
          new ApiResponse(401, "error", "Not authorized, token failed", null),
        );
    }
  }

  if (!token) {
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          "error",
          "Not authorized, no token provided",
          null,
        ),
      );
  }
};

export default protect;

import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { crud } from "../crud/auth.js";

async function login(req, res) {
  try {
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET
    );
    res.status(StatusCodes.OK).json({ access: accessToken });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function signup(req, res) {
  try {
    await crud.signup(req.body);
    res.status(StatusCodes.OK).json({ message: "Signed up successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

export const controllers = {
  login,
  signup,
};

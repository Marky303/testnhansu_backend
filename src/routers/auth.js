import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/auth.js";
import { controllers } from "../controllers/auth.js";

export const authRouter = express.Router();

authRouter.post("/signup", validations.signup, controllers.signup);

authRouter.post("/login", validations.login, controllers.login);

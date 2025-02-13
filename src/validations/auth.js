import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { crud } from "../crud/auth.js";

// Schema definitions
const loginSchema = Joi.object({
  email: Joi.string().required().min(3).max(30).trim().strict(),
  password: Joi.string()
    .required()
    .trim()
    .strict()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const signupSchema = Joi.object({
  email: Joi.string().required().min(3).max(30).trim().strict(),
  password: Joi.string()
    .required()
    .trim()
    .strict()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repassword: Joi.string()
    .required()
    .trim()
    .strict()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

// Validator definitions
async function login(req, res, next) {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
    if (!(await crud.checkAccountValidity(req.body)))
      throw "Invalid email or password!";
    next();
  } catch (err) {
    handleError(err, res);
  }
}

async function signup(req, res, next) {
  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false });
    if (await crud.checkIfEmailExists(req.body.email))
      throw "Email already existed!";
    next();
  } catch (err) {
    handleError(err, res);
  }
}

// Helper functions
async function handleError(err, res) {
  let errList = [];

  if (err.details)
    for (let i = 0; i < err.details.length; i++) {
      errList.push(err.details[i].message);
    }
  else errList.push(err);

  res.status(StatusCodes.BAD_REQUEST).json({
    error: errList,
  });
}

// Export
export const validations = {
  login,
  signup,
};

import express from "express";
import { login, logout, refresh, signUp } from "../controllers/auth";
import validator from "../utils/validation/validator";
import { userLoginSchema, userRegistrationSchema } from "../utils/validation";
import { RequestErrorHandler } from "../utils/Errors/ErrorHandler";

const app = express.Router();

/**
 * @openapi
 * /auth/signup:
 *  post:
 *      tags:
 *          - "Register a new user to the web site"
 *      summary: "This route is used to register and log users in"
 *      description: "This route returns an access token when registered and sets refresh token in cookies"
 *      responses:
 *          200:
 *              description: "User has been created"
 */
app.post(
  "/signup",
  validator(userRegistrationSchema),
  RequestErrorHandler(signUp)
);

app.post("/refresh", RequestErrorHandler(refresh));

app.post("/login", validator(userLoginSchema), RequestErrorHandler(login));

app.post("/logout", RequestErrorHandler(logout));

export default app;

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
 *      parameters:
 *        - name: email
 *          in: body
 *          description: Email of the user to be created, should be unique
 *          required: true
 *          schema:
 *            type: string
 *        - name: name
 *          in: body
 *          description: Name of the user to be created, must be at least 3 characters long
 *          required: true
 *          schema:
 *            type: string
 *        - name: password
 *          in: body
 *          description: Password of the user account, must be at least 8 characters long, should contain at least 1 small letter, 1 captial letter, 1 number and 1 special character
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: "User has been created"
 *              headers:
 *                Set-Cookie:
 *                  description: "Refresh Token"
 *                  schema:
 *                    type: string
 *                    example: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNobTAwNkBvdXRsb29rLmNvbSIsImlhdCI6MTY4NzUxNTUyOSwiZXhwIjoxNjg4MTIwMzI5fQ.JA60fjGjKeP_84eNgCpy41W1RII1_ZCvEGkfNVVdSKw; Path=/; Domain=localhost; Secure; HttpOnly; Expires=Fri, 23 Jun 2023 11:18:49 GMT;"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        example: "SUCCESS"
 *                      msg:
 *                        type: object
 *                        properties:
 *                          accessToken:
 *                            type: string
 *                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNobTAwNkBvdXRsb29rLmNvbSIsImlhdCI6MTY4NzUwMzA4OCwiZXhwIjoxNjg3NTA0ODg4fQ.UC3NeeIzPrYvEYPQt_JMcvQ_v3G_OdgRazT8GMvZkJ0"
 *                          name:
 *                            type: string
 *                            example: "Akash M"
 *                          email:
 *                            type: string
 *                            example: "akashm006@outlook.com"
 *          422:
 *            description: "There are some validation errors when creating credentials"
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: "FAILED"
 *                    msg:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          path:
 *                            type: string
 *                            example: "email"
 *                          message:
 *                            type: string
 *                            example: "Email is required"
 *          500:
 *            description: "Internval server error"
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: "FAILURE"
 *                    msg:
 *                      type: string
 *                      example: "Something went wrong when trying to process your request. Please try again."
 */
app.post(
  "/signup",
  validator(userRegistrationSchema),
  RequestErrorHandler(signUp)
);

/**
 * @openapi
 * /auth/refresh:
 *  post:
 *    tags:
 *      - "Send a new access token with the refresh token"
 *    summary: "This route returns a new access with the refresh token is set on the cookies"
 *    description: "This route is requested in order to get a new access by verifying the user based on the refresh token in the cookies"
 *    paramters:
 *      - name: jwt
 *        in: cookie
 *        description: The cookie that was returned when user was authenticated must be sent in order to request for an access token
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "User is authenticated and new access token is given"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "SUCCESS"
 *                msg:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNobTAwNkBvdXRsb29rLmNvbSIsImlhdCI6MTY4NzUwMzA4OCwiZXhwIjoxNjg3NTA0ODg4fQ.UC3NeeIzPrYvEYPQt_JMcvQ_v3G_OdgRazT8GMvZkJ0"
 *      401:
 *        description: "UnAuthorized"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "FAILED"
 *                msg:
 *                  type: string
 *                  example: "UnAuthorized"
 *      500:
 *        description: "Internal server error"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "FAILED"
 *                msg:
 *                  type: string
 *                  example: "Something went wrong when trying to process your request. Please try again."
 */
app.post("/refresh", RequestErrorHandler(refresh));

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - "Login"
 *    summary: "This route returns access token and user credentials once the user is authenticated successfully"
 *    description: "This route is used for logging any users in"
 *    paramters:
 *      - name: email
 *        in: body
 *        description: "Email of the user to login"
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        in: body
 *        description: "Password of the user to login"
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "The user was authenticated successfully"
 *        headers:
 *          Set-Cookie:
 *            description: Refresh token
 *            schema:
 *              type: string
 *              example: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNobTAwNkBvdXRsb29rLmNvbSIsImlhdCI6MTY4NzUxNTUyOSwiZXhwIjoxNjg4MTIwMzI5fQ.JA60fjGjKeP_84eNgCpy41W1RII1_ZCvEGkfNVVdSKw; Path=/; Domain=localhost; Secure; HttpOnly; Expires=Fri, 23 Jun 2023 11:18:49 GMT;"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "SUCCESS"
 *                msg:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNobTAwNkBvdXRsb29rLmNvbSIsImlhdCI6MTY4NzUxNTUyOSwiZXhwIjoxNjg3NTE3MzI5fQ.hoTO6tbkgs_Qj2rBrcpGKGgi065E9AMkxLLZ8u4zcHY"
 *                    email:
 *                      type: string
 *                      example: "akashm006@outlook.com"
 *                    name:
 *                      type: string
 *                      example: "Akash M"
 *      422:
 *        description: "The user password or email is wrong"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "FAILED"
 *                msg:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      path:
 *                        type: string
 *                        example: "email"
 *                      message:
 *                        type: string
 *                        example: "Email is required"
 *      500:
 *        description: "Internal server error"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "FAILED"
 *                msg:
 *                  type: string
 *                  example: "Something went wrong when trying to process your request. Please try again."
 *
 */
app.post("/login", validator(userLoginSchema), RequestErrorHandler(login));

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    tags:
 *      - "Logout"
 *    summary: "This route clears to cookie set by the server as the refresh token"
 *    description: "A request to this route clears the refresh token set as cookie by the server"
 *    responses:
 *      200:
 *        description: "User has been logged out"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "SUCCESS"
 *                msg:
 *                  type: string
 *                  example: "User logged out"
 *      500:
 *        description: "Internal server error"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "SUCCESS"
 *                msg:
 *                  type: string
 *                  example: "Something went wrong when trying to process your request. Please try again."
 */
app.post("/logout", RequestErrorHandler(logout));

export default app;

import express from "express";
import { RequestErrorHandler } from "../utils/Errors/ErrorHandler";
import { getSecret } from "../controllers/secret";
import verifyJwt from "../utils/middlewares/verifyJwt";

const app = express();

/**
 * @openapi
 * /secret:
 *  get:
 *      tags:
 *          - "Secret for user once they login"
 *      summary: "This route returns a secret that a user can access only when they are logged in"
 *      description: "Just to test if the user is logged in"
 *      responses:
 *          200:
 *              description: "The user is authenticated"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: "Your secret is safe with me! Do not worry!!"
 *                              status:
 *                                  type: string
 *                                  example: "SUCCESS"
 *          401:
 *              description: "The user in not authenticated"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: "UnAuthorized"
 *                              status:
 *                                  type: string
 *                                  example: "FAILED"
 *          500:
 *              description: "Internal server error"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: "Something went wrong when trying to process your request. Please try again."
 *                              status:
 *                                  type: string
 *                                  example: "FAILED"
 */
app.get("/", verifyJwt, RequestErrorHandler(getSecret));

export default app;

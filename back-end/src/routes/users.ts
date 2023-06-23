import express from "express";
import { deleteAll, getDetail } from "../controllers/user";
import verifyJwt from "../utils/middlewares/verifyJwt";
import { RequestErrorHandler } from "../utils/Errors/ErrorHandler";

const app = express.Router();

/**
 * @openapi
 * /users:
 *  get:
 *      tags:
 *          - "Get user information"
 *      summary: "This route returns the user who has sent a request to this route"
 *      description: "This is used to get the information on the user whoever requests this route"
 *      responses:
 *          200:
 *              description: "The user information is returned"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: object
 *                                  properties:
 *                                      email:
 *                                          type: string
 *                                          example: "akashm006@outlook.com"
 *                                      name:
 *                                          type: string
 *                                          example: "Akash M"
 *                                      created_at:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-06-21T05:52:06.274Z"
 *                              status:
 *                                  type: string
 *                                  example: "SUCCESS"
 *          401:
 *              description: "The user requesting is not authenticated"
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
app.get("/", verifyJwt, RequestErrorHandler(getDetail));

/**
 * @openapi
 * /users/all:
 *  delete:
 *      tags:
 *          - "Debug"
 *          - "Delete all users in db"
 *      summary: "A request to this route deletes all the users and is used only in development"
 *      description: "This route deletes all users and is intented for development purposes only"
 *      responses:
 *          200:
 *              description: "Deleted all users"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: "Successfully deleted all users"
 *                              status:
 *                                  type: string
 *                                  example: "SUCCESS"
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
 *                                  example: "FAILURE"
 */
app.delete("/all", deleteAll);

export default app;

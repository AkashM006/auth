import express from "express";
import { helloWord, notFound } from "../controllers";
import { default as swaggerRoutes } from "./swagger";
import { default as authRoutes } from "./auth";
import { default as userRoutes } from "./users";
import { default as secretRoutes } from "./secret";

const app = express.Router();

app.use("/secret", secretRoutes);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/api", swaggerRoutes);

/**
 * @openapi
 * /:
 *  get:
 *      tags:
 *          - "Hello world"
 *      summary: "This route returns hello world to the user"
 *      description: "This route return hello world to the user"
 *      responses:
 *          200:
 *              description: "The server is running"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: "Hello world"
 *                              status:
 *                                  type: "string"
 *                                  example: "SUCCESS"
 *
 */
app.get("/", helloWord);

// sample usage of rate limiting:
// app.get("/", loginRateLimiter, helloWord)

/**
 * @openapi
 *  /{any}:
 *      x-swagger-router-controller: notFound
 *      get:
 *          tags:
 *              - "Not Found"
 *          summary: "Any other routes are handled by this and its not found basically "
 *          responses:
 *              404:
 *                  description: "The requested URL is not found"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                              msg:
 *                                  type: string
 *                                  example: "Not found"
 *                              status:
 *                                  type: string
 *                                  example: "FAILURE"
 */
app.use(notFound);

export default app;

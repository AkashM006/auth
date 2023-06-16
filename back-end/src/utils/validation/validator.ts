import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "../logger";
import * as yup from "yup";

type ErrorObject = {
  message: string;
  path: string;
};

const validator =
  (schema: yup.Schema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;

    try {
      const result = await schema.validate(body, { abortEarly: false });
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        let result: ErrorObject[] = [];
        let paths: string[] = [];

        error.inner.forEach((item) => {
          if (!item.path || paths.includes(item.path)) return;
          paths.push(item.path);
          result.push({
            path: item.path,
            message: item.message,
          });
        });

        return res.status(422).json({
          status: "FAILED",
          msg: result,
        });
      }

      logger.error(error);
      return res.status(500).json({
        status: "FAILED",
        msg: "Something went wrong when trying to process your request. Please try again later.",
      });
    }
  };
export default validator;

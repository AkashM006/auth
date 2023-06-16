import { Request, Response } from "express";

const helloWord = (req: Request, res: Response) => {
  res.json({
    msg: "Hello world",
    status: "SUCCESS",
  });
};

const notFound = (req: Request, res: Response) => {
  // but later use this to throw error
  res.json({
    msg: "Not found",
    status: "FAILURE",
  });
};

export { helloWord, notFound };

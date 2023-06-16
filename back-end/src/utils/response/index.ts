import { Response } from "express";

const successHandler = (res: Response, msg: any, status?: number) => {
  return res.status(status ?? 200).json({
    status: "SUCCESS",
    msg,
  });
};

export { successHandler };

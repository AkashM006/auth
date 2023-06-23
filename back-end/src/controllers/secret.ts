import { NextFunction, Response } from "express";
import { Request } from "../types/http";
import { successHandler } from "../utils/response";

export const getSecret = (req: Request, res: Response, next: NextFunction) => {
  successHandler(res, "Your secret is safe with me!!! Do not worry");
};

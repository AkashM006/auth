import { NextFunction, Response } from "express";
import { RequestErrorHandler } from "../Errors/ErrorHandler";
import { UnAuthorizedError } from "../Errors/Errors";
import { DecodedToken, verifyToken } from "../jwt";
import { Request } from "../../types/http";

const verifyJwt = RequestErrorHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) throw new UnAuthorizedError();

    const token = authHeader.split(" ")[1];

    verifyToken(token, "access", (error, decoded) => {
      if (error) throw new UnAuthorizedError();

      const userData = decoded as DecodedToken;

      req.user = userData;
      next();
    });
  }
);

export default verifyJwt;

import { NextFunction, Response } from "express";
import { RequestErrorHandler } from "../Errors/ErrorHandler";
import { UnAuthorizedError } from "../Errors/Errors";
import { DecodedToken, verifyToken } from "../jwt";
import { Headers, Request } from "../../types/http";

const verifyJwt = RequestErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers as Headers;
    const authHeader = headers.authorization || headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) throw new UnAuthorizedError();

    const token = authHeader.split(" ")[1];

    // verifyToken(token, "access", (error, decoded) => {
    //   if (error) throw new UnAuthorizedError();

    //   const userData = decoded as DecodedToken;

    //   req.user = userData;
    //   next();
    // });
    const decoded = await verifyToken(token, "access");

    const userData = decoded as DecodedToken;

    req.user = userData;
    next();
  }
);

export default verifyJwt;

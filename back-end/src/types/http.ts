import { Request as ExpressRequest } from "express";
import { IncomingHttpHeaders } from "http";

type User = {
  email: string;
};

export interface Request extends ExpressRequest {
  user?: User;
}

export interface Headers extends IncomingHttpHeaders {
  Authorization: string;
}

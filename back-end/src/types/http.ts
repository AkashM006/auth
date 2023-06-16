import { Request as ExpressRequest } from "express";

type User = {
  email: string;
};

export interface Request extends ExpressRequest {
  user?: User;
}

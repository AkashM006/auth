import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import { successHandler } from "../utils/response";

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  await prisma.users.deleteMany();

  successHandler(res, "Successfully deleted all users");
};

export { deleteAll };

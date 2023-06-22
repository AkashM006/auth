import { NextFunction, Response } from "express";
import prisma from "../utils/prisma";
import { successHandler } from "../utils/response";
import { Request } from "../types/http";

const getDetail = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  const result = await prisma.users.findFirst({
    where: {
      email: user?.email,
    },
  });

  successHandler(res, {
    email: result?.email,
    name: result?.name,
    created_at: result?.created_at,
  });
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  await prisma.users.deleteMany();

  successHandler(res, "Successfully deleted all users");
};

export { deleteAll, getDetail };

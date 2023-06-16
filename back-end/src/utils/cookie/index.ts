import { Response } from "express";

const setCookie = (res: Response, data: any, name: string) => {
  res.cookie(name, data, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 20, // 20 minutes
  });
};

export default setCookie;

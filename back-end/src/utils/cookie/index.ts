import { Response } from "express";

const setCookie = (res: Response, data: any, name: string) => {
  res.cookie(name, data, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60, // 1 hour
    domain: "localhost",
  });
};

export default setCookie;

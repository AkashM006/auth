import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import { CustomError, UnAuthorizedError } from "../utils/Errors/Errors";
import { comparePassword, generateHash } from "../utils/password";
import {
  DecodedToken,
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../utils/jwt";
import setCookie from "../utils/cookie";
import { successHandler } from "../utils/response";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const users = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (users)
    throw new CustomError(
      "UserAlreadyExistsError",
      "This email id is already taken. Please try a new one",
      400
    );

  const hashedPassword = await generateHash(password);

  await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const user = { email, name };

  const accessToken = signAccessToken(user);

  const refreshToken = signRefreshToken(user);

  setCookie(res, refreshToken, "jwt");

  successHandler(res, { accessToken });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw new UnAuthorizedError();

  const match = comparePassword(password, user.password);

  if (!match) throw new UnAuthorizedError();

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  setCookie(res, refreshToken, "jwt");

  successHandler(res, { accessToken });
};

const refresh = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) throw new UnAuthorizedError();

  const refreshToken = cookies.jwt;

  verifyToken(refreshToken, "refresh", async (error, decoded) => {
    if (error) throw new UnAuthorizedError();

    let decodedToken = decoded as DecodedToken;

    const user = await prisma.users.findFirst({
      where: {
        email: decodedToken.email,
      },
    });

    if (!user) throw new UnAuthorizedError();

    const accessToken = signAccessToken(user);

    successHandler(res, { accessToken });
  });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (cookies.jwt)
    res.clearCookie("jwt", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
  successHandler(res, "User logged out");
};

export { signUp, refresh, login, logout };

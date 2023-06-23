import jwt from "jsonwebtoken";

type TokenUser = {
  email: string;
  name: string;
};

export interface DecodedToken extends jwt.JwtPayload {
  email: string;
}

const signAccessToken = (user: TokenUser) =>
  signToken(user, process.env.ACCESS_TOKEN_SECRET as string, "30m"); // 30m

const signRefreshToken = (user: TokenUser) =>
  signToken(user, process.env.REFRESH_TOKEN_SECRET as string, "7d");

const signToken = (user: TokenUser, secret: string, expiresIn: string) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    secret,
    { expiresIn }
  );

  return token;
};

const verifyToken = (token: string, type: "refresh" | "access") => {
  const secret =
    type === "refresh"
      ? (process.env.REFRESH_TOKEN_SECRET as string)
      : (process.env.ACCESS_TOKEN_SECRET as string);
  return jwt.verify(token, secret);
};

export { signAccessToken, signRefreshToken, verifyToken };

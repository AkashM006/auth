import jwt from "jsonwebtoken";

type TokenUser = {
  email: string;
  name: string;
};

// type DecodedToken = {
//   email: string;
// };
export interface DecodedToken extends jwt.JwtPayload {
  email: string;
}

const signAccessToken = (user: TokenUser) =>
  signToken(user, process.env.ACCESS_TOKEN_SECRET as string, "15m");

const signRefreshToken = (user: TokenUser) =>
  signToken(user, process.env.REFRESH_TOKEN_SECRET as string, "1d");

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

type VerficationCallback = (
  error: jwt.VerifyErrors | null,
  decoded: string | jwt.JwtPayload | undefined
) => void;

const verifyToken = (
  token: string,
  type: "refresh" | "access",
  callback: VerficationCallback
) => {
  const secret =
    type === "refresh"
      ? (process.env.REFRESH_TOKEN_SECRET as string)
      : (process.env.ACCESS_TOKEN_SECRET as string);
  jwt.verify(token, secret, callback);
};

export { signAccessToken, signRefreshToken, verifyToken };

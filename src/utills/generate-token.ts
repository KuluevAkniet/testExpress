import { sign } from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return sign(payload, secretKey, { expiresIn })
}

export const generateRefreshToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return sign(payload, secretKey, { expiresIn })
}
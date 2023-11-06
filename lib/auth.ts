import { SHA256 } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export const authKey = (req: NextRequest): boolean => {
  const headerKey = req.headers.get("api-key");

  if (!headerKey) {
    return false;
  }

  const decodedKey = Buffer.from(headerKey, "base64").toString();

  try {
    JSON.parse(decodedKey);
  } catch (e) {
    return false;
  }

  const { timestamp, token } = JSON.parse(decodedKey) as {
    timestamp: number;
    token: string;
  };

  if (!timestamp || Date.now() - timestamp > 1 * 60 * 1000) {
    return false;
  }

  const secretKey = process.env.SECRET_KEY || "secretkey";
  const checkToken = SHA256(timestamp + secretKey).toString();

  if (token !== checkToken) {
    return false;
  }

  return true;
};

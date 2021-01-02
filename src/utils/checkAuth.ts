import axios from "axios";
import ApiRequest from "../interfaces/ApiRequest";
import { verify } from "jsonwebtoken";

export default async function checkAuth(req: ApiRequest): Promise<string> {
  const token = req.headers.auth;
  const JWT_SECRET = process.env["JWT_SECRET"];

  try {
    const vToken = verify(String(token), JWT_SECRET);

    const { data } = await axios({
      method: "GET",
      url: "https://discord.com/api/v8/users/@me",
      headers: {
        Authorization: `Bearer ${vToken}`,
      },
    });

    req.user = { _id: data.id };

    return Promise.resolve("Authorized");
  } catch (e) {
    return Promise.reject({
      error: e?.response?.data?.message || "An unexpected error occurred",
      code: 401,
      status: "error",
      invalid_token: true,
    });
  }
}

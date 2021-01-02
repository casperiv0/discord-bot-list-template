import axios from "axios";
import ApiRequest from "../interfaces/ApiRequest";

export default async function checkAuth(req: ApiRequest): Promise<string> {
  const token = req.cookies.session || req.headers.auth;
  let data;
  try {
    data = await axios({
      url: "https://discord.com/api/v8/users/@me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }

  if (data.message) {
    return Promise.reject({
      error: data?.message,
      code: 401,
      status: "error",
      invalid_token: true,
    });
  } else {
    return Promise.resolve("Authorized");
  }
}

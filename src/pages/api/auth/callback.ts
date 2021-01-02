import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../../models/User.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];
  const DISCORD_CLIENT_SECRET = process.env["DISCORD_CLIENT_SECRET"];
  const DISCORD_CALLBACK_URL = process.env["DISCORD_CALLBACK_URL"];
  const JWT_SECRET = process.env["JWT_SECRET"];

  const code = query.code;

  if (!code) {
    return res.json({ error: "No code was provided", status: "error" });
  }

  const { data } = await axios({
    url: `https://discord.com/api/v8/oauth2/token?grant_type=authorization_code&code=${code}`,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: encode({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: DISCORD_CALLBACK_URL,
      scope: "identify guilds",
    }),
  });

  const token = jwt.sign(data.access_token, JWT_SECRET);

  // Get the user data. username, avatar and userId
  const { data: userData } = await axios({
    url: "https://discord.com/api/users/@me",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  // Search for a user in our database
  const user = await UserModel.findOne({ user_id: userData.id });

  // If no user was found in our database, save the user
  if (!user) {
    await UserModel.create({
      avatar_id: userData.avatar,
      username: userData.username,
      user_id: userData.id,
    });
  }

  // Set the cookie
  const expiresInMilliseconds = data.expires_in * 1000;
  setCookie({ res }, "session", token, {
    expires: new Date(Date.now() + expiresInMilliseconds),
    httpOnly: true,
    path: "/",
    secure: true,
  });

  res.redirect("/");
}

function encode(obj: object) {
  let string = "";

  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;
    string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  return string.substring(1);
}

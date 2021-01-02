import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];
  const DISCORD_CALLBACK_URL = process.env["DISCORD_CALLBACK_URL"];

  const url = `https://discordapp.com/api/v8/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    DISCORD_CALLBACK_URL
  )}&response_type=code&scope=${encodeURIComponent(
    "identify guilds"
  )}&prompt=consent&response_type=code`;

  return res.redirect(url);
}

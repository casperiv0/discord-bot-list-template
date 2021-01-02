import { NextApiResponse } from "next";
import ApiRequest from "../../../interfaces/ApiRequest";
import BotModel from "../../../models/Bot.model";
import UserModel from "../../../models/User.model";
import checkAuth from "../../../utils/checkAuth";
import connectDb from "../../../utils/database";

export default async function handler(
  req: ApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { method } = req;

  await connectDb();

  switch (method) {
    case "POST": {
      try {
        await checkAuth(req);
      } catch (e) {
        return res.json(e);
      }

      const {
        botId,
        prefix,
        description,
        tags,
        websiteUrl,
        githubUrl,
        supportInvite,
        botInviteUrl,
      } = req.body;

      if (!botId || !prefix || !description || !botInviteUrl) {
        return res.json({
          error: "Must provide `botId`, `prefix`, `botInviteUrl` and `description`",
          status: "error",
          code: 401,
        });
      }

      const user = await UserModel.findOne({ user_id: req.user._id });

      if (!user) {
        return res.redirect("/api/auth/login");
      }

      const newBot = new BotModel({
        client_id: botId,
        description,
        prefix,
        tags,
        website_url: websiteUrl,
        github_url: githubUrl,
        bot_invite_url: botInviteUrl,
        support_invite: supportInvite,
        user_id: user?._id,
      });

      await newBot.save();
      return res.json({ status: "success", bot: newBot });
    }
    default: {
      return res.json({ error: "Method not allowed", code: 405, status: "error" });
    }
  }
}

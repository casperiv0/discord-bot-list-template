import { NextApiResponse } from "next";
import ApiRequest from "../../../interfaces/ApiRequest";
import BotModel from "../../../models/Bot.model";
import UserModel from "../../../models/User.model";
import checkAuth from "../../../utils/checkAuth";

export default async function handler(
  req: ApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { method } = req;

  switch (method) {
    case "POST": {
      try {
        await checkAuth(req);
      } catch (e) {
        return res.redirect("/api/auth/login");
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

      if (!botId || !prefix || !description) {
        return res.json({
          error: "Must provide `botId`, `prefix` and `description`",
          status: "error",
          code: 401,
        });
      }
      if (description.length < 200) {
        return res.json({
          error: "Description must be at least 200 characters long!",
          status: "error",
          code: 400,
        });
      }

      const user = UserModel.findById(req.user._id);

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
        uploaded_by: user,
      });

      await newBot.save();
      break;
    }
    default: {
      return res.json({
        error: "Method not allowed",
        code: 405,
        status: "error",
      });
    }
  }
}

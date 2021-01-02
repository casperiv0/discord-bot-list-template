import { NextApiRequest, NextApiResponse } from "next";
import BotModel from "../../../models/Bot.model";
import connectDb from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  const { method, query } = req;

  await connectDb();

  switch (method) {
    case "GET": {
      const { botId } = query as { botId: string };

      const bot = await BotModel.findOne({ client_id: botId });

      if (!bot) {
        return res.json({ bot: null, status: "error", code: 404, error: "Bot was not found" });
      }

      return res.json({ bot, status: "success", code: 200 });
    }
  }
}

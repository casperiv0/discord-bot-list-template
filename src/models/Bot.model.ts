import { models, model, Schema, Document } from "mongoose";

interface IBot extends Document {
  name: string;
  client_id: string;
  prefix: string;
  description: string;
  tags: string[];
  website_url: string | null;
  github_url: string | null;
  support_invite: string | null;
  bot_invite_url: string;
  user_id: string;
  created_at: number;
}

const BotSchema = new Schema({
  name: {
    type: String,
    default: "soon",
  },
  client_id: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bot_invite_url: {
    type: String,
    required: true,
  },
  tags: Array,
  website_url: {
    type: String,
    default: null,
  },
  github_url: {
    type: String,
    default: null,
  },
  support_invite: {
    type: String,
    default: null,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

export default models.Bot || model<IBot>("Bot", BotSchema);

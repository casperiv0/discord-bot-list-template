import User from "./User"

interface Bot {
  _id: string;
  name: string;
  client_id: string;
  prefix: string;
  description: string;
  tags: string[];
  website_url: string | null;
  github_url: string | null;
  support_invite: string | null;
  bot_invite_url: string;
  uploaded_by: User;
  created_at: number;
}

export default Bot;

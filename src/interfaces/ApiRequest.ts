import { NextApiRequest } from "next-auth/_utils";

interface ApiRequest extends NextApiRequest {
  user?: { _id: string };
}

export default ApiRequest;

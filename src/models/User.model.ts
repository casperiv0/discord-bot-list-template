import { models, model, Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  avatar_id: string | null;
  user_id: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  avatar_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

export default models.User || model<IUser>("User", UserSchema);

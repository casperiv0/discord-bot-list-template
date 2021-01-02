import { connect } from "mongoose";

export default async function connectDb(): Promise<void> {
  const MONGODB_URI = process.env["MONGODB_URI"];
  try {
    await connect(`${MONGODB_URI}`, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info("Connected to mongodb");
  } catch (err) {
    console.error(err);
  }
}

import { connect } from "mongoose";

export default async function connectDb() {
  const MONGODB_URI = process.env["MONGODB_URI"];
  try {
    await connect(MONGODB_URI, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info("Connected to mongodb");
  } catch (err) {
    console.error(err);
  }
}

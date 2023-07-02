import mongoose from "mongoose";

const mongodb = await mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/plansimply",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default mongodb;

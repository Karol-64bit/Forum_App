import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const threadSchema = new Schema(
  {
    userId: String,
    userName: String,
    title: String,
    question: String,
    sectionId: String,
    userAvatarUrl: String,
  },
  {
    timestamps: true,
  }
);

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
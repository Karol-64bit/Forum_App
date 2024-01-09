import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const sectionSchema = new Schema(
  {
    title: String,
    description: String,
    threads: [{type: Schema.Types.ObjectId, ref: 'Thread'}],
  },
  {
    timestamps: true,
  }
);

const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;
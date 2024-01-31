import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const settingsSchema = new Schema(
  {
    title: String,
    description: String,
    logoImage: String,
    footerImage: String,
    color1: String,
    color2: String,
    color3: String,
    statute: String,
    footerInfo: String,
  },
  {
    timestamps: true,
  }
);

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;

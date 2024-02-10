import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const settingsSchema = new Schema(
  {
    title: String,
    description: String,
    logoImage: String,
    footerImage: String,
    footerText: String,
    backgroundColor: String,
    navColor: String,
    element1Color: String,
    element2Color: String,
    statute: String,
    googleProvider: Boolean,
    githubProvider: Boolean,
    displayDescription: Boolean,
    displayFooter: Boolean,
  },
  {
    timestamps: true,
  }
);

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;

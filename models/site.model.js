import mongoose from "mongoose";
// import RoutePathSchema from "./routepath.external.js";

//Define collection and schema for Business
var siteSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String, //! DATATYPES
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },
    types: {
      type: Array, //! DATATYPES
      name: { type: Object },
      // routepath_match: [RoutePathSchema],
    },
    locale: {
      type: Array, //! DATATYPES
      code: { type: String },
      lang: { type: String },
      language_name: { type: String },
      date_format: { type: String, default: "YYYY-MM-DD" },
      time_format: { type: String, default: "HH:mm" },
      default: {
        type: Boolean,
        default: false,
      },
    },
    title: { type: Array }, //! DATATYPES
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    collection: "sites",
  }
);

//#region queries
siteSchema.query.findByName = function (name) {
  return this.findOne({
    name: { $regex: new RegExp(name, "i") }, //make case-insensitive queries
  }).lean();
};
//#endregion

const Site = mongoose.model("sites", siteSchema);
export default Site;

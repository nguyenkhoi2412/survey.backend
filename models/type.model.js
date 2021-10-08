import mongoose from "mongoose";
import { Helpers } from "../utils/helpers.js";

//Define collection and schema for Business
var typeSchema = new mongoose.Schema(
  {
    _id: { type: String, default: Helpers.uuidv4() },
    site_ref: { type: Number, ref: "sites" },
    name: { type: Object, trim: true },
    axact: { type: Boolean, default: false },
    public: { type: Boolean, default: false },
    path: { type: String, default: "" },
    component_import: { type: String, default: "" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    collection: "types",
  }
);

//#region queries
typeSchema.query.findByFilter = function (filterInfos) {
  return this.find(filterInfos).lean();
  // .populate("site_ref", "name locale");
};

typeSchema.query.findBySite = function (site_ref) {
  return this.find({
    site_ref: site_ref,
  })
    .select({ name: 1 })
    .lean()
    .populate("site_ref", "name locale");
};
//#endregion

const Type = mongoose.model("types", typeSchema);
export default Type;

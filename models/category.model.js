import mongoose from "mongoose";

var Schema = mongoose.Schema;

//Define collection and schema for Business
var categorySchema = new Schema(
  {
    _id: { type: String },
    title: { type: Object, trim: true, required: true },
    sub_title: { type: Object, trim: true },
    desc: { type: Object, trim: true, default: {} },
    parent: { type: String },
    children: { type: Array, default: [] },
    type_ref: { type: String, ref: "types" },
    site_ref: { type: Number, ref: "sites" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    collection: "categories",
  }
);

//#region queries
categorySchema.query.findByFilter = function (filterInfos) {
  return this.find(filterInfos).lean().populate("type_ref", "name");
};

categorySchema.query.findByType = function (type_ref) {
  return this.find({
    type_ref: type_ref,
  })
    .select({ title: 1, parent: 1, children: 1 })
    .sort({ title: 1 })
    .lean()
    .populate("type_ref", "_id name");
};
//#endregion

const Category = mongoose.model("categories", categorySchema);
export default Category;

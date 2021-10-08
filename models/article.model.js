import mongoose from "mongoose";

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Define collection and schema for Business
var articleSchema = new Schema(
  {
    title: { type: Object, trim: true },
    sub_title: { type: Object, trim: true },
    description: { type: Object, trim: true },
    sort_no: { type: Number },
    categories_ref: [{ type: ObjectId, ref: "categories"}],
    type_ref: { type: ObjectId, ref: "types" },
    site_ref: { type: ObjectId, ref: "sites" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    collection: "articles",
  }
);

//#region queries
//#endregion

const Article = mongoose.model("articles", articleSchema);
export default Article;

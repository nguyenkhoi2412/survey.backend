import mongoose from "mongoose";
import encryptHelper from "../utils/encrypt.helper.js";
import { Helpers } from "../utils/helpers.js";
import bcrypt from "bcrypt";

//Define collection and schema for Business
var userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: Helpers.uuidv4() },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
  {
    collection: "users",
  }
);

//#region queries
userSchema.query.findByUsername = function (username) {
  return this.where({ username: username });
};
//#endregion

//#region methods
// check compare password with bcrypt
userSchema.methods.verifyPassword = function (
  password,
  decryptCryptoJs = true
) {
  // decrypt password using cryptoJs
  const pwd = decryptCryptoJs
    ? encryptHelper.cryptoJs.decryption_AES(password)
    : password;

  //encrypt password to get data
  return bcrypt.compareSync(pwd, this.password);
};
//#endregion

//hashing a password before saving it to the database
userSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);
export default User;

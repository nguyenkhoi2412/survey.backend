import express from "express";
import auth from "../controllers/auth.controller.js";
const routerAuth = express.Router();

//#region USERS
// GET: api/auth/refreshtoken
//routerAuth.route("/refreshtoken/").post(auth.REFRESH_TOKEN);

// GET: api/auth/validate
routerAuth.route("/validate/").post(auth.VALIDATE_USER);

// POST: api/auth/register
routerAuth
  .route("/register/")
  .post(auth.REGISTER_USER);
//#endregion

export default routerAuth;

import express from "express";
// import article from "../controllers/article.controller.js";
import verifyTokenJWT from "../middleware/authJwt.js";
const routerType = express.Router();

//#region ARTICLES

// // GET: api/type/getbypageno
// routerType.route("/getbypageno/:pageno&:pagesize&:sort").get(type.GET_BY_PAGING);

// // GET: api/type/getbysite
// routerType.route("/getbysite/:site_ref").get(type.GET_BY_SITE);

// // POST: api/type/insertnew
// routerType.route("/insertnew").post(type.INSERT_NEW)

// // PUT: api/type/update
// routerType.route("/update").put(type.UPDATE);

// // DELETE: api/type/delete
// routerType.route("/delete/:id").delete(type.DELETE);
//#endregion

export default routerArticle;

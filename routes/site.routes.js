import express from "express";
import site from "../controllers/site.controller.js";
const routerSite = express.Router();

//#region SITES

// GET: api/site/getbyname
routerSite.route("/getbyname/:name").get(site.GET_BY_NAME);
//#endregion

export default routerSite;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import captcha from "./utils/captcha.js";
import dbService from "./config/dbService.js";
import corsOptions from "./config/corsOptions.js";
import authRoutes from "./routes/auth.routes.js";
import siteRoutes from "./routes/site.routes.js";
import typeRoutes from "./routes/type.routes.js";
import categoryRoutes from "./routes/category.routes.js";
// import articleRoutes from "./routes/article.routes.js";
import surveyRoutes from "./routes/survey.routes.js";
import questionRoutes from "./routes/question.routes.js";
import userAnswerRoutes from "./routes/user_answer.routes.js";

//dotenv config, read data in .env
dotenv.config();

const app = express();

//connect database
dbService.connect((err) => {
  if (err) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;

  //Express js listen method to run project on http://localhost:5000
  app.listen(PORT, function () {
    console.log(
      `App is running in ${PORT} mode on port ${PORT}`
    );
  });
});

//Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// error handle
app.use((err, req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );

  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

//#region Request API callback generate captch
// Human checkable test path, returns image for browser
app.get("/api/captcha/test/:width?/:height?/", (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image } = captcha(width, height);
  res.send(`<img class="generated-captcha" src="${image}">`);
});

// Captcha generation, returns PNG data URL and validation text
app.get("/api/captcha/:width?/:height?/", (req, res) => {
  const width = parseInt(req.params.width) || 200;
  const height = parseInt(req.params.height) || 100;
  const { image, text } = captcha(width, height);
  res.send({ image, text });
});
//#endregion

//#region Routes which handles requests
//Request API for clients callback
app.use("/api/auth", authRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/type", typeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/user/answer", userAnswerRoutes);
// app.use("/api/customers", customerRoutes);
//#endregion

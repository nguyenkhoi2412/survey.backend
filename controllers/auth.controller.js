import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { ROLE } from "../shared/enums.js";
import User from "../models/user.model.js";
import { Helpers } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

export default {
  //refreshtoken function to retrieve new token
  REFRESH_TOKEN: asyncHandler(async (req, res) => {
    const refreshToken = req.body.refresh_token;

    try {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN,
        (error, decoded) => {
          if (error) {
            return res.status(401).send({
              code: 401,
              ok: false,
              message: "Unauthorized!",
            });
          }

          const user = decoded.data;
          const jwtToken = jwt.sign({ data: user }, process.env.JWT_TOKEN, {
            expiresIn: 3600,
          });

          res.status(200).json({
            code: 200,
            ok: true,
            message: "ok",
            rs: {
              currentUser: {
                ...user,
                password: "",
              },
              access_token: jwtToken,
              refresh_token: refreshToken,
            },
          });
        }
      );
    } catch (err) {
      res.status(403).json({
        code: 403,
        ok: false,
        message: err.message,
      });
    }
  }),

  //validate function to retrieve user by username & password
  VALIDATE_USER: asyncHandler(async (req, res) => {
    // get user by username
    User.findOne()
      .findByUsername(req.body.username)
      .exec((err, user) => {
        if (err) {
          return res.status(401).json({
            code: 401,
            ok: false,
            message: err.message,
          });
        }

        if (!user) {
          return res.status(200).json({
            code: 200,
            ok: false,
            message: "User not found",
            rs: [],
          });
        }

        //verify password with crypto & bcrypt
        if (!user.verifyPassword(req.body.password)) {
          return res.status(200).json({
            code: 200,
            ok: false,
            message: "Authentication failed. Incorrect password",
            rs: [],
          });
        }

        const jwtToken = jwt.sign({ data: user }, process.env.JWT_TOKEN, {
          expiresIn: parseInt(process.env.TOKEN_EXPIRESIN), // 4 hours
        });

        // create refresh token
        const jwtRefreshToken = jwt.sign(
          { data: user },
          process.env.JWT_REFRESH_TOKEN,
          {
            expiresIn: parseInt(process.env.TOKEN_EXPIRESIN) * 6, // 24 hours
          }
        );

        res.status(200).json({
          code: 200,
          ok: true,
          message: "ok",
          rs: {
            currentUser: {
              ...user.toJSON(),
              password: "",
            },
            access_token: jwtToken,
            refresh_token: jwtRefreshToken,
          },
        });
      });
  }),
  //saveUser function to save new user
  REGISTER_USER: asyncHandler(async (req, res) => {
    // Create an instance of model SomeModel
    const { username, password, role } = req.body;

    var userData = new User({
      _id: Helpers.uuidv4(),
      username: username,
      password: password,
      role: role === undefined ? ROLE.USER.name : role,
    });

    // await mongoose.connection
    //   .collection("users")
    //   .insertOne(userData, function (err, result) {
    //     if (err) res.json({ message: err.message });

    //     if (result) {
    //       res.json(result);
    //     }
    //   });

    // Save the new model instance, passing a callback
    userData.save(function (err, result) {
      if (err) res.json({ message: err.message });

      // saved!
      if (result) {
        res.json(result);
      }
    });
  }),
};

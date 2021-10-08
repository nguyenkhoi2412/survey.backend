// config cors with options
export default {
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// const whitelist = ["http://localhost:1001"];
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },

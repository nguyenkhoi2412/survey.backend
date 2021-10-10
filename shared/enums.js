export const ROLE = {
  ADMIN: {
    name: "admin",
    power: ["GET", "POST", "PUT", "DELETE"],
  },

  USER: {
    name: "user",
    power: ["GET"],
  },
  VISITOR: {
    name: "visitor",
    power: ["GET"],
  },
};

import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyTokenJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token !== null) {
    jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
      if (error) {
        return catchError(error, res);
      }

      if ((req.method === "DELETE" || req.method === "PUT") && decoded.data.role === "test") {
        return res
          .status(405) // 405 Method Not Allowed 
          .send({ message: "Account test can not update/delete." });
      }

      req.data = decoded;
      next();
    });
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }
};

export default verifyTokenJWT;

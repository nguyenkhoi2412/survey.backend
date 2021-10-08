export default {
  DEFAULT: (res, err, data, additionalData = {}) => {
    const code = 200;
    const method = res.req.method;
    const dataLength =
      data === null || data === undefined || data.length === undefined
        ? 1
        : data.length;
    let messageOk = dataLength + " record(s) ";

    switch (method) {
      case "POST":
        messageOk += "inserted.";
        break;

      case "PUT":
        messageOk += "updated.";
        break;

      case "DELETE":
        messageOk += "deleted.";
        break;

      default:
        // is GET
        messageOk += "founded";
        break;
    }

    // error
    if (err) {
      return res.status(code).json({
        code: code,
        ok: false,
        message: err.message,
      });
    }

    // not found
    if (!data) {
      return res.status(code).json({
        code: code,
        ok: true,
        message: "Data not found",
      });
    }

    const responseJson = {
      code: code,
      ok: true,
      message: messageOk,
      rs: data,
    };

    const mergedData = {
      ...responseJson,
      ...additionalData,
    };

    res.status(code).json(mergedData);
  },
};

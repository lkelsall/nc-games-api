exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<-- unhandled error!");
  res.status(500).send({ msg: "server error" });
};

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "not found" });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, "<-- unhandled error!");
  res.status(500).send({ msg: "server error" });
};

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "not found" });
};

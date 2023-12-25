const validate =
  (schema, field = "body") =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[field]);

    if (!error) {
      req[field] = value;
      return next();
    }

    return res
      .status(400)
      .send({ status: false, data: null, message: error.details[0].message });
  };

module.exports = validate;

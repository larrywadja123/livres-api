const Joi = require("joi");

// schéma ouvrage
const ouvrageSchema = Joi.object({
  titre: Joi.string().required(),
  auteur: Joi.string().required(),
  prix: Joi.number().required(),
  stock: Joi.number().min(0).required(),
  categorie_id: Joi.number().required()
});

// middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  next();
};

module.exports = { validate, ouvrageSchema };
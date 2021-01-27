const Joi = require('@hapi/joi');
const registerValidation = data => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().min(6).required(),
		firstName: Joi.string().min(4).required(),
		lastName: Joi.string().min(4).required(),
		phoneNumber: Joi.string().min(10).required(),
		points: Joi.number().required(),
	});
	return Joi.validate(data, schema);
};
const loginValidation = data => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	return Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

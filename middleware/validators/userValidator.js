import Joi from "joi";



const registerValidator = (req, res, next) => {
  const user = req.body;
  const schema = Joi.object({

    name: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[A-Z]{1}[a-z0-9]{3,30}[!@#%^&*()_+-=\\{}|;':,./<>?~`]{1}$"))
      .required(),

    confirmPassword: Joi.ref('password'),

    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required(),
  });

  const result = schema.validate(user);
  // console.log("result", result);
  if (result.error) {
    res.status(400).json({ errors: result.error });
    return;
  }

  next();
};


const loginValidator = (req, res, next) => {
  const loginDetails = req.body;
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^[A-Z]{1}[a-z0-9]{3,30}[!@#%^&*()_+-=\\{}|;':,./<>?~`]{1}$"))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
  });

  const result = schema.validate(loginDetails);
  console.log("result", result);
  if (result.error) {
    res.status(400).json({ errors: result.error });
    return;
  }

  next();
};



export  {registerValidator, loginValidator};
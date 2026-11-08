import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../utils/error.exceptions";

export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      next(new BadRequestError(result.error.details.map((item) => item.message).join(", ")));
      return;
    }

    req.body = result.value;
    next();
  };
}

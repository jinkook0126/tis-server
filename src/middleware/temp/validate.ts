import { Context, Next } from 'koa';
import Joi from 'joi';

export async function validateNameByPathParam(context: Context, next: Next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(context.params);
  if (error) {
    context.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  await next();
}
export async function validateNameByQeuryString(context: Context, next: Next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(context.request.query);
  if (error) {
    context.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  await next();
}

export async function validateNameAge(context: Context, next: Next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required().min(1),
  });
  const { error } = schema.validate(context.request.body);
  if (error) {
    context.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  await next();
}
export async function validateNameAgeIdx(context: Context, next: Next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required().min(1),
    idx: Joi.number().required().min(1),
  });
  const { error } = schema.validate(context.request.body);
  if (error) {
    context.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  await next();
}

export async function validateIdx(context: Context, next: Next) {
  const schema = Joi.object({
    idx: Joi.number().required().min(1),
  });
  const { error } = schema.validate(context.request.body);
  if (error) {
    context.body = {
      success: false,
      msg: error.details.map(el => el.message).join(','),
    };
    return;
  }
  await next();
}

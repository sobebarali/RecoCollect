import Joi from 'joi';
import { typePayload } from '../types/create.types';

const createSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(100).allow(''),
});

export default createSchema;

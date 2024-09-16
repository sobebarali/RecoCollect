import Joi from 'joi';
import { typePayload } from '../types/list.types';

const listSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  page: Joi.string().min(2).max(100).required(),
  perPage: Joi.number().required(),
});

export default listSchema;

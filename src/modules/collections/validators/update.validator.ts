import Joi from 'joi';
import { typePayload } from '../types/update.types';

const updateSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  collection_id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(100).required(),
});

export default updateSchema;

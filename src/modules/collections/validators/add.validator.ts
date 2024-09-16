import Joi from 'joi';
import { typePayload } from '../types/add.types';

const addSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  collection_id: Joi.number().required(),
  recommendation_id: Joi.number().required(),
});

export default addSchema;

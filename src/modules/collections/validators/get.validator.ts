import Joi from 'joi';
import { typePayload } from '../types/get.types';

const getSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  collection_id: Joi.number().required(),
});

export default getSchema;

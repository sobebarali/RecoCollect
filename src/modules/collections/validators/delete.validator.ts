import Joi from 'joi';
import { typePayload } from '../types/delete.types';

const deleteSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  collection_id: Joi.number().required(),
});

export default deleteSchema;

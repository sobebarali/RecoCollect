import Joi from 'joi';
import { typePayload } from '../types/list.types';

const listSchema = Joi.object<typePayload>({
  user_id: Joi.number().required(),
  page: Joi.number().optional().allow(null),
  perPage: Joi.number().optional().allow(null),
});

export default listSchema;

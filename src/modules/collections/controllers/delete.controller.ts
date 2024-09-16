import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import deleteSchema from '../validators/delete.validator';
import deleteCollections from '../handlers/delete.handler';
import { typePayload } from '../types/delete.types';

export default async function endpointDeleteCollections(
  req: Request,
  res: Response,
): Promise<any> {
  const payload: typePayload = {
    user_id: req.body.user_id,
    collection_id: parseInt(req.params.collection_id),
  };

  let validationResult = runValidation({
    payload,
    schema: deleteSchema,
  });

  if (typeof validationResult.error !== 'undefined') {
    return res.status(400).json({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: validationResult.error.details[0].message,
      },
    });
  } else {
    let result = await deleteCollections(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}

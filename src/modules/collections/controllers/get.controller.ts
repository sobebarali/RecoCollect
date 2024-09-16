import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import getSchema from '../validators/get.validator';
import getCollections from '../handlers/get.handler';
import { typePayload } from '../types/get.types';

export default async function endpointGetCollections(
  req: Request,
  res: Response,
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: getSchema,
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
    const payload = req.body as typePayload;
    let result = await getCollections(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}

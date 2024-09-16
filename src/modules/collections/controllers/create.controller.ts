import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import createSchema from '../validators/create.validator';
import createCollections from '../handlers/create.handler';
import { typePayload } from '../types/create.types';

export default async function endpointCreateCollections(
  req: Request,
  res: Response,
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: createSchema,
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
    let result = await createCollections(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}

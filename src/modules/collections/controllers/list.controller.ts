import { Request, Response } from 'express';
// import runValidation from '../../../utils/runValidation';
// import listSchema from '../validators/list.validator';
import listCollections from '../handlers/list.handler';
import { typePayload } from '../types/list.types';

export default async function endpointListCollections(
  req: Request,
  res: Response,
): Promise<any> {
  let payload: typePayload = {
    user_id: parseInt(req.query.page as string),
    page: req.query.page ? parseInt(req.query.page as string) : NaN,
    perPage: req.query.perPage ? parseInt(req.query.perPage as string) : NaN,
  };

  console.log('payload', payload);

  // let validationResult = runValidation({
  //   payload,
  //   schema: listSchema,
  // });

  let result = await listCollections(payload);
  if (result.error) {
    res.status(result.error.statusCode).send(result);
  } else {
    res.status(200).send(result);
  }

  // if (typeof validationResult.error !== 'undefined') {
  //   return res.status(400).json({
  //     data: null,
  //     error: {
  //       code: 'VALIDATION_ERROR',
  //       message: validationResult.error.details[0].message,
  //     },
  //   });
  // } else {

  // }
}

import { Request, Response } from 'express';
import runValidation from '../../../utils/runValidation';
import addSchema from '../validators/add.validator';
import addRecommendationToCollection from '../handlers/add.handler';
import { typePayload } from '../types/add.types';

export default async function endpointAddRecommendationCollections(
  req: Request,
  res: Response,
): Promise<any> {
  const payload: typePayload = {
    user_id: req.body.user_id,
    collection_id: parseInt(req.params.collection_id),
    recommendation_id: req.body.recommendation_id,
  };

  console.log('payload', payload);

  let validationResult = runValidation({
    payload,
    schema: addSchema,
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
    let result = await addRecommendationToCollection(payload);
    if (result.error) {
      res.status(result.error.statusCode).send(result);
    } else {
      res.status(200).send(result);
    }
  }
}

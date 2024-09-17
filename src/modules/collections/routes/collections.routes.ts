import express from 'express';

import endpointCreateCollections from '../controllers/create.controller';
import endpointGetCollections from '../controllers/get.controller';
import endpointUpdateCollections from '../controllers/update.controller';
import endpointDeleteCollections from '../controllers/delete.controller';
import endpointListCollections from '../controllers/list.controller';
import endpointAddRecommendationCollections from '../controllers/add.controller';
import endpointRemoveRecommendationCollections from '../controllers/remove.controller';

const collectionsRouter = express.Router();

collectionsRouter.post('/collections', endpointCreateCollections);
collectionsRouter.get('/collections/:collection_id', endpointGetCollections);
collectionsRouter.put('/collections/:collection_id', endpointUpdateCollections);
collectionsRouter.put(
  '/collections/:collection_id/recommendations',
  endpointAddRecommendationCollections,
);
collectionsRouter.put(
  '/collections/:collection_id/recommendations/:recommendation_id',
  endpointRemoveRecommendationCollections,
);
collectionsRouter.delete(
  '/collections/:collection_id',
  endpointDeleteCollections,
);
collectionsRouter.get('/users/:user_id/collections', endpointListCollections);

export default collectionsRouter;

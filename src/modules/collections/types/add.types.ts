export type typePayload = {
  user_id: number;
  collection_id: number;
  recommendation_id: number;
};

export type typeResultData = {
  code: string;
  message: string;
  user_id: number;
  collection_id: number;
  recommendation_id: number;
};

export type typeResultError = {
  code: string;
  message: string;
  statusCode: number;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
};

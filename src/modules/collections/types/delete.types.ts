export type typePayload = {
  user_id: number;
  collection_id: number;
};

export type typeResultData = {
  code: string;
  message: string;
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

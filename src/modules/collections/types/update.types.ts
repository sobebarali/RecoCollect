export type typePayload = {
  user_id: number;
  collection_id: number;
  name: string | undefined;
  description: string | undefined;
};

export type typeResultData = {
  user_id: number;
  collection_id: number;
  name: string;
  description: string;
  created_at: number;
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

export type typePayload = {
  user_id: number;
  page: number;
  perPage: number;
};

export type typeResultData = {
  collections: {
    user_id: number;
    collection_id: number;
    name: string;
    description: string;
    created_at: number;
    // recommendations: {
    //   recommendation_id: number;
    //   user_id: number;
    //   title: string;
    //   caption: string;
    //   pictures: string[];
    //   created_at: number;
    // }[];
  }[];
  page: number;
  perPage: number;
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

interface ErrorModel {
  status: number;
  data: DataErrorModel;
}

interface DataErrorModel {
  code: number;
  message: string;
  description?: string;
  details?: Array<ErrorModel>;
}

export { ErrorModel, DataErrorModel };

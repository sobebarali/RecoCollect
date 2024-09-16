export class CustomError extends Error {
  errorCode: string;
  statusCode?: number;

  constructor(errorCode: string, message: string, statusCode?: number) {
    super(message);
    this.errorCode = errorCode;
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

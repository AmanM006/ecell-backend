export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    // Maintain proper prototype chain (important for instanceof checks)
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

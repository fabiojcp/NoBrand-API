export class RequestErrors extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ErrorHandler extends RequestErrors {
  constructor(message: string, status: number) {
    super(message, status)
  }
}

export class BadRequestError extends RequestErrors {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends RequestErrors {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends RequestErrors {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ConflitError extends RequestErrors {
  constructor(message: string) {
    super(message, 409);
  }
}

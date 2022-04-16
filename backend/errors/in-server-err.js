class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.errorName = 'InternalServerError';
    this.errorMessage = message;
  }
}

module.exports = InternalServerError;

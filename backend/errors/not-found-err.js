class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorName = 'NotFoundError';
    this.errorMessage = message;
  }
}

module.exports = NotFoundError;

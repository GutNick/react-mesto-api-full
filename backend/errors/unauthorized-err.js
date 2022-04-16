class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.errorName = 'UnauthorizedError';
    this.errorMessage = message;
  }
}

module.exports = UnauthorizedError;

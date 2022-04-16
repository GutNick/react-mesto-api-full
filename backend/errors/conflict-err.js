class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorName = 'ConflictError';
    this.errorMessage = message;
  }
}

module.exports = ConflictError;

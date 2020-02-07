import AppError from '../../src/error';

class StoreError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'StoreError';
  }
}

export default StoreError;

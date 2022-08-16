/* eslint-disable max-classes-per-file */
export class UnrecoverableError extends Error {
  name = 'Unrecoverable Error';
}

export class ContractMissconfigurationError extends UnrecoverableError {
  constructor(protected address: string) {
    super(`Unable to init contract, addr='${address || '(none)'}'`);
  }
}

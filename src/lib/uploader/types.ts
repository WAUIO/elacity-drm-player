export interface IUploader {
  baseURL?: string;
  setBaseURL: (baseURL: string) => IUploader;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: <T extends unknown>(payload: FormData, options?: any) => Promise<T>;
}

export interface IFormTransformer<T extends unknown> {
  transform: (payload: T) => Promise<FormData>;
}

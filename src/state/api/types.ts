export type IApiStatus = 'success' | 'failed';

export interface IApiResponse<T> {
  status: IApiStatus;
  data: T;
}

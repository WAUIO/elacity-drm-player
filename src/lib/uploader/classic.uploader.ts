import { merge } from 'lodash';
import { IUploader } from './types';

export default class ClassicUploader implements IUploader {
  // eslint-disable-next-line no-empty-function, no-useless-constructor
  constructor(public baseURL?: string) {}

  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;

    return this;
  }

  // eslint-disable-next-line no-undef
  public async upload <T extends unknown>(payload: FormData, o?: RequestInit) {
    const options = merge(o, {
      method: 'POST',
      body: payload,
      headers: {},
    });

    const res = await fetch(`${this.baseURL}/files/upload`, options);

    if (res.status >= 400) {
      return Promise.reject(res);
    }

    return res.json() as T;
  }
}

import { IStorage } from './interface';

export default class LocalJsonStorage<T> implements IStorage<T, void> {
  protected v: T;

  constructor(protected key: string, defaultValue?: T) {
    this.v = (defaultValue || {}) as T;
  }

  public load(): void {
    const prevValues = localStorage.getItem(this.key);
    if (!prevValues) {
      this.v = (this.v || {}) as T;
    } else {
      this.v = JSON.parse(prevValues);
    }
  }

  public setValues(values: Partial<T>): void {
    // take the latest value in prior
    let toStore: T;
    const prevValues = localStorage.getItem(this.key);
    if (!prevValues) {
      toStore = {
        ...((this.v || {}) as T),
        ...values,
      };
    } else {
      toStore = {
        ...JSON.parse(prevValues),
        ...values,
      };
    }

    localStorage.setItem(this.key, JSON.stringify(toStore));
  }

  public values(): T {
    return this.v as T;
  }
}

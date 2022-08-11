export interface IStorage<T, R extends void> {
  load(): R;
  setValues(value: Partial<T>): R;
  values(): T;
}

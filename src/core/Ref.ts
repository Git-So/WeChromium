export interface RefImpl<T> {
  value: T;
}

export function ref<T>(value: T): RefImpl<T> {
  return { value };
}

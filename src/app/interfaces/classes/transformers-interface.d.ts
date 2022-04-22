declare interface ITransformers<T> {
  transform: (...args: any) => T;
}

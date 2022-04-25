declare interface ITransformer<U, T> {
  transform: (data: U, ...args: any) => T;
}

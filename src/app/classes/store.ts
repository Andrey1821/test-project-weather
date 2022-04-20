import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _data$ = new BehaviorSubject<T | void>(undefined);

  public get data(): T | void {
    return this._data$.getValue();
  }

  public get changes$(): Observable<T | void> {
    return this._data$.asObservable();
  }

  public updateValue(data: T): Observable<T> {
    this._data$.next(data);
    return this._data$.asObservable() as Observable<T>;
  }

  public clearValue(): Observable<void> {
    this._data$.next();
    return this._data$.asObservable() as Observable<void>;
  }
}

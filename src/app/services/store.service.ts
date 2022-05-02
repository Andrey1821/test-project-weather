import { Injectable } from '@angular/core';
import { Store } from '../classes/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public userCoords = new Store<ICoords>();
  public userLocation = new Store<ILocation>();

  // public updateStoreValueWithTransform<T, U>(data: U, store: Store<T>, transformer: ITransformers<T>): Observable<T> {
  //   const transformedData = transformer.transform(data);
  //   return store.updateValue(transformedData);
  // }

  public updateStoreValue<T>(data: T, store: Store<T>): Observable<T> {
    return store.updateValue(data);
  }
}

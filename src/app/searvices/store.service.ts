import { Injectable } from '@angular/core';
import { Store } from "../classes/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public userLocation = new Store<ILocation>();
}

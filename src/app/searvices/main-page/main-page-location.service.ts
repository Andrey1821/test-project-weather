import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageLocationService {

  constructor(
    private store: StoreService,
  ) {
  }

  public getUserBasicLocation(): Observable<ILocation> {
    return this.store.userLocation.changes$
      .pipe(
        filter(v => !!v)
      ) as Observable<ILocation>;
  }
}

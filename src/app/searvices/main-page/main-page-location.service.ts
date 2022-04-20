import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';
import { LocationSimpleTransformerService } from '../transformers/location/location-simple-transformer.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageLocationService {

  constructor(
    private store: StoreService,
    private locationTransformerService: LocationSimpleTransformerService
  ) {
  }

  public setUserLocation(weather: IWeather): void {
    const locationData: ILocation
      = this.locationTransformerService.transform(weather.locationName, this.store.userCoords.data!);
    this.store.updateStoreValue(locationData, this.store.userLocation);
  }

  public getUserLocation(): Observable<ILocation> {
    return this.store.userLocation.changes$
      .pipe(
        filter(v => !!v)
      ) as Observable<ILocation>;
  }
}

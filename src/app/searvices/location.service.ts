import { Injectable } from '@angular/core';
import { LocationSimpleTransformerService } from './transformers/location/location-simple-transformer.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private store: StoreService,
    private locationTransformerService: LocationSimpleTransformerService
  ) {
  }

  public setUserBasicLocation(weather: IWeather): void {
    const locationData: ILocation
      = this.locationTransformerService.transform(weather.locationName, this.store.userCoords.data!);
    this.store.updateStoreValue(locationData, this.store.userLocation);
  }

}

import { Injectable } from '@angular/core';
import { LocationSimpleTransformerService } from './transformers/location/location-simple-transformer.service';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { LocationsHttpService } from './http/locations-http.service';
import { filter, map, tap } from 'rxjs/operators';
import { LocationApiTransformerService } from './transformers/location/location-api-transformer.service';
import { StorageService } from './storage.service';
import { NEW_LOCATIONS } from '../constants/storage-keys.consts';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private store: StoreService,
    private locationsHttpService: LocationsHttpService,
    private locationSimpleTransformerService: LocationSimpleTransformerService,
    private locationApiTransformerService: LocationApiTransformerService,
    private storage: StorageService
  ) {
  }

  public setUserBasicLocation(weather: IWeather): void {
    const id = Date.now();
    const locationData: ILocation
      = this.locationSimpleTransformerService.transform(this.store.userCoords.data!, weather.locationName, id);
    this.store.updateStoreValue(locationData, this.store.userLocation);
  }

  public getUserBasicLocation(): Observable<ILocation> {
    return this.store.userLocation.changes$
      .pipe(
        filter(v => !!v)
      ) as Observable<ILocation>;
  }

  public getLocations(): Observable<ILocation[]> {
    return this.locationsHttpService.getLocation()
      .pipe(
        map((data) => this.locationApiTransformerService.transform(data)),
        tap(locations => this.storage.saveLocationsToStorage(locations, NEW_LOCATIONS))
      );
  }
}

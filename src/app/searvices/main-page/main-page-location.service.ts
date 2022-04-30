import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationService } from '../location.service';
import { StorageService } from '../storage.service';
import { LOCATIONS_TYPES } from '../../types/storage-keys.types';
import { NEW_LOCATIONS } from '../../constants/storage-keys.consts';

@Injectable({
  providedIn: 'root'
})
export class MainPageLocationService {

  constructor(
    private locationsService: LocationService,
    private storageService: StorageService
  ) {
  }

  public getUserBasicLocation(): Observable<ILocation> {
    return this.locationsService.getUserBasicLocation();
  }

  public getLocations(): Observable<ILocation[]> {
    const newLocations = this.getStorageLocationsByKey(NEW_LOCATIONS);
    if(newLocations) return of(newLocations);
    return this.locationsService.getLocations();
  }

  public getStorageLocationsByKey(key: LOCATIONS_TYPES): ILocation[] | undefined {
    return this.storageService.getStorageLocationsByKey(key);
  }

  public setStorageLocations(locations: ILocation[], key: LOCATIONS_TYPES): void {
    this.storageService.saveLocationsToStorage(locations, key);
  }
}

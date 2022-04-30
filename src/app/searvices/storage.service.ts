import { Injectable } from '@angular/core';
import { LOCATIONS_TYPES, SAVED_LOCATIONS_TYPE } from '../types/storage-keys.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public saveLocationsToStorage(locations: ILocation[], key: LOCATIONS_TYPES): void {
    const jsonLocations = JSON.stringify(locations);
    localStorage.setItem(key, jsonLocations);
  }

  public getStorageLocationsByKey(key: LOCATIONS_TYPES): ILocation[] | undefined {
    const locations = localStorage.getItem(key);
    if(!locations) {
      return;
    }else {
      return JSON.parse(locations);
    }
  }
}

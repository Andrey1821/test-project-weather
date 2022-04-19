import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationTransformerService {
  public transformToLocation(location: GeolocationPosition): ILocation {
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    }
  }
}

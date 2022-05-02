import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordsGeolocationTransformerService implements ITransformer<GeolocationPosition, ICoords> {
  public transform(location: GeolocationPosition): ICoords {
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    }
  }
}

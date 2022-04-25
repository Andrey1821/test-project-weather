import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationSimpleTransformerService implements ITransformer<ICoords, ILocation> {
  public transform(coords: ICoords, locationName: string): ILocation {
    return {
      locationName,
      coords
    }
  }
}

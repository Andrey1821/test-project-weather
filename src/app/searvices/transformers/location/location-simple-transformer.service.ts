import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationSimpleTransformerService implements ITransformers<ILocation> {
  public transform(name: string, coords: ICoords): ILocation {
    return {
      name,
      coords
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationApiTransformerService implements ITransformer<ILocationApi, ILocation[]>{
  transform(locationApi: ILocationApi): ILocation[] {
    return locationApi.records.map(record => {
      return {
        locationName: record.fields.ascii_name,
        coords: this.transformToCoordinates(record.fields.coordinates)
      }
    })
  }

  private transformToCoordinates(coordsArr: number[]): ICoords {
    return {
      lat: coordsArr[0],
      lon: coordsArr[1]
    }
  }
}

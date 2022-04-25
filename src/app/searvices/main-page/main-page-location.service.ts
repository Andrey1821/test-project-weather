import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageLocationService {

  constructor(
    private locationsService: LocationService
  ) {
  }

  public getUserBasicLocation(): Observable<ILocation> {
    return this.locationsService.getUserBasicLocation();
  }

  public getLocations(): Observable<ILocation[]> {
    return this.locationsService.getLocations();
  }
}

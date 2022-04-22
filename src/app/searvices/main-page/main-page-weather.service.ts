import { Injectable } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';
import { StoreService } from '../store.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LocationService } from '../location.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageWeatherService {

  constructor(
    private weatherService: WeatherService,
    private store: StoreService,
    private locationService: LocationService
  ) {
  }

  public getWeatherByBasicCoords(): Observable<IWeather> {
    return this.store.userCoords.changes$
      .pipe(
        filter(v => !!v),
        switchMap((coords) => this.weatherService.getWeather(coords!)),
        tap((weather) => this.locationService.setUserBasicLocation(weather))
      )
  }

  public getWeatherByCoords(coords: ICoords): Observable<IWeather> {
    return this.weatherService.getWeather(coords);
  }
}

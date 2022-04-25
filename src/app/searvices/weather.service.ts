import { Injectable } from '@angular/core';
import { WeatherHttpService } from './http/weather-http.service';
import { createHttpParams } from '../@utils/create-http-params';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { WeatherTransformerService } from './transformers/weather/weather-transformer.service';
import { StoreService } from './store.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private weatherHttp: WeatherHttpService,
    private weatherTransformerService: WeatherTransformerService,
    private store: StoreService,
    private locationService: LocationService
  ) {
  }

  public getWeatherByBasicCoords(): Observable<IWeather> {
    return this.store.userCoords.changes$
      .pipe(
        filter(v => !!v),
        switchMap((coords) => this.getWeather(coords!)),
        tap((weather) => this.locationService.setUserBasicLocation(weather))
      )
  }

  public getWeather(coords: ICoords): Observable<IWeather> {
    const params = createHttpParams(coords);
    return this.weatherHttp.getWeatherByCoords(params)
      .pipe(
        map(weather => this.weatherTransformerService.transform(weather))
      );
  }
}

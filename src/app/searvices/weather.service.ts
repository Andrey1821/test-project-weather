import { Injectable } from '@angular/core';
import { WeatherHttpService } from './http/weather-http.service';
import { createHttpParams } from '../@utils/create-http-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherTransformerService } from './transformers/weather/weather-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private weatherHttp: WeatherHttpService,
    private weatherTransformerService: WeatherTransformerService
  ) {
  }

  public getWeather(coords: ICoords): Observable<IWeather> {
    const params = createHttpParams(coords);
    return this.weatherHttp.getWeatherByCoords(params)
      .pipe(
        map(weather => this.weatherTransformerService.transform(weather))
      );
  }
}

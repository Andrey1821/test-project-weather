import { Injectable } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageWeatherService {

  constructor(
    private weatherService: WeatherService,
  ) {
  }

  public getWeatherByBasicCoords(): Observable<IWeather> {
    return this.weatherService.getWeatherByBasicCoords();
  }

  public getWeatherByCoords(coords: ICoords): Observable<IWeather> {
    return this.weatherService.getWeather(coords);
  }
}

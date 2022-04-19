import { Injectable } from '@angular/core';
import { WeatherHttpService } from "../http/weather-http.service";
import { createHttpParams } from "../../@utils/create-http-params";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private weatherHttp: WeatherHttpService) {
  }

  public getWeather(location: ILocation) {
    const params = createHttpParams(location);
    this.weatherHttp.getWeatherByCoords(params).subscribe(data => console.log(data));
  }
}

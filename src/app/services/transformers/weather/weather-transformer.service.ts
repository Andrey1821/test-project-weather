import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherTransformerService implements ITransformer<IWeatherApi, IWeather> {
  public transform(weatherApi: IWeatherApi): IWeather {
    const {name, main, wind, clouds, weather, sys} = weatherApi;
    return {
      locationName: name,
      weather: this.transformToWeatherInfo(main, wind, clouds, weather),
      sunInfo: this.transformToSunInfo(sys),
    };
  }

  private transformToSunInfo(sunInfo: ISysApi): ISunInfo {
    const {sunrise, sunset} = sunInfo;
    return {
      sunrise,
      sunset
    };
  }

  private transformToWeatherInfo(
    weatherMainInfo: IMainWeatherInfoApi,
    windInfo: IWindApi,
    cloudsInfo: ICloudsApi,
    weatherBasicInfo: IWeatherBasicInfoApi[]
  ): IWeatherInfo {
    return {
      temp: weatherMainInfo.temp,
      feelsLike: weatherMainInfo.feels_like,
      tempMin: weatherMainInfo.temp_min,
      tempMax: weatherMainInfo.temp_max,
      humidity: weatherMainInfo.humidity,
      clouds: cloudsInfo.all,
      windSpeed: windInfo.speed,
      windDeg: windInfo.deg,
      weatherIcon: this.transformToWeatherIcons(weatherBasicInfo),
    };
  }

  private transformToWeatherIcons(weatherBasicInfo: IWeatherBasicInfoApi[]): string[] {
    return weatherBasicInfo.map(info => info.icon);
  }
}

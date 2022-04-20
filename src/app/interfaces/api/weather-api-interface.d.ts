declare interface IWeatherApi {
  coord: ICoords;
  weather: IWeatherBasicInfoApi[];
  base: string;
  main: IMainWeatherInfoApi;
  visibility: number;
  wind: IWindApi;
  clouds: ICloudsApi;
  dt: number;
  sys: ISysApi;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

declare interface IWeatherBasicInfoApi {
  id: number;
  main: string;
  description: string;
  icon: string;
}

declare interface IMainWeatherInfoApi {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

declare interface IWindApi {
  speed: number;
  deg: number;
  gust: number;
}

declare interface ICloudsApi {
  all: number;
}

declare interface ISysApi {
  country: string;
  sunrise: number;
  sunset: number;
}

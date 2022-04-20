declare interface IWeather {
  locationName: string;
  weather: IWeatherInfo;
  sunInfo: ISunInfo;
}

declare interface IWeatherInfo {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  clouds: number;
  windSpeed: number;
  windDeg: number;
  weatherIcon: string[];
}

declare interface ISunInfo {
  sunrise: number;
  sunset: number;
}



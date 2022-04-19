import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../../searvices/weather-page/weather.service";
import { StoreService } from "../../../searvices/store.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit {
  private unsubscribeStore$ = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private store: StoreService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToUserLocation();
  }

  private subscribeToUserLocation(): void {
    this.store.userLocation.changes$
      .pipe(
        filter(v => !!v),
        takeUntil(this.unsubscribeStore$)
      )
      .subscribe((location) => {
        this.getWeatherByLocation(location!);
        this.unsubscribeStore$.next();
      })
  }

  private getWeatherByLocation(location: ILocation): void {
    this.weatherService.getWeather(location);
  }

}

import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MainPageWeatherService } from '../../../searvices/main-page/main-page-weather.service';
import { MainPageLocationService } from '../../../searvices/main-page/main-page-location.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  public basicLocation: ILocation;
  public weather: IWeather;
  private unsubscribeBasicWeather$ = new Subject<void>();
  private unsubscribeBasicLocation$ = new Subject<void>();

  constructor(
    private mainPageWeatherService: MainPageWeatherService,
    private mainPageLocationService: MainPageLocationService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initState();
  }

  private initState(): void {
    this.getWeatherByBasicCoords();
    this.getBasicLocation();
  }

  private getWeatherByBasicCoords() {
    this.mainPageWeatherService.getWeatherByBasicCoords()
      .pipe(
        takeUntil(this.unsubscribeBasicWeather$)
      ).subscribe(weather => {
      this.weather = weather;
      this.cd.detectChanges();
    });
  }

  private getBasicLocation() {
    this.mainPageLocationService.getUserBasicLocation()
      .pipe(
        takeUntil(this.unsubscribeBasicLocation$)
      ).subscribe(location => {
      this.basicLocation = location;
      this.cd.detectChanges();
    });
  }

  private getWeatherByCoords(location: ILocation): void {
    this.mainPageWeatherService.getWeatherByCoords(location.coords);
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MainPageWeatherService } from '../../../searvices/main-page/main-page-weather.service';
import { MainPageLocationService } from '../../../searvices/main-page/main-page-location.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  public basicLocation: ILocation;
  public weather: IWeather;
  public locations: ILocation[];
  public savedLocations: ILocation[] = [];
  public selectedLocationsBarTitle = 'Your Locations';
  public newLocationsBarTitle = 'Select Locations';
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
    this.getLocations();
  }

  private getWeatherByBasicCoords(): void {
    this.mainPageWeatherService.getWeatherByBasicCoords()
      .pipe(
        takeUntil(this.unsubscribeBasicWeather$)
      ).subscribe(weather => {
      this.weather = weather;
      this.cd.detectChanges();
      this.unsubscribeBasicWeather$.next();
    });
  }

  private getBasicLocation(): void {
    this.mainPageLocationService.getUserBasicLocation()
      .pipe(
        takeUntil(this.unsubscribeBasicLocation$)
      ).subscribe(location => {
      this.basicLocation = location;
      this.cd.detectChanges();
      this.unsubscribeBasicLocation$.next();
    });
  }

  private getLocations(): void {
    this.mainPageLocationService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
        this.cd.detectChanges();
      }
    })
  }

  public saveLocation(location: ILocation): void {
    console.log(location)
    this.savedLocations = [...this.savedLocations, location];
    this.cd.detectChanges();
  }

  private getWeatherByCoords(location: ILocation): void {
    this.mainPageWeatherService.getWeatherByCoords(location.coords).subscribe();
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public onChangeLocations$ = new BehaviorSubject<INewLocationConfig | undefined>(undefined);
  public selectedLocationsBarTitle = 'Your Locations';
  public newLocationsBarTitle = 'Select Locations';
  public isVisibleNewLocations = false;
  private unsubscribeBasicWeather$ = new Subject<void>();
  private unsubscribeBasicLocation$ = new Subject<void>();
  private isSentRequest: boolean;

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
    if(this.isSentRequest) return;
    this.isSentRequest = true;

    this.mainPageLocationService.getUserBasicLocation()
      .pipe(
        takeUntil(this.unsubscribeBasicLocation$)
      ).subscribe(location => {
      this.basicLocation = location;
      this.cd.detectChanges();
      this.isSentRequest = false;
      if(this.isLoaded()) this.emitOnChangedData();
      this.unsubscribeBasicLocation$.next();
    }, () => this.isSentRequest = false);
  }

  private getLocations(): void {
    this.mainPageLocationService.getLocations()
      .subscribe((locations) => {
      this.locations = locations;
      this.cd.detectChanges();
      if (this.isLoaded()) this.emitOnChangedData();
    })
  }

  private isLoaded(): boolean {
    return !!(this.basicLocation && this.locations)
  }


  private emitOnChangedData(): void {
    this.onChangeLocations$.next(this.createNewLocationConfig());
  }

  private createNewLocationConfig(): INewLocationConfig {
    return {
      locations: this.locations,
      basicUserLocation: this.basicLocation,
      savedLocations: this.savedLocations
    }
  }

  public openNewLocations(): void {
    this.isVisibleNewLocations = true;
  }

  public hideNewLocations(): void {
    this.isVisibleNewLocations = false;
  }

  public saveLocation(location: ILocation): void {
    this.savedLocations = [...this.savedLocations, location];
    this.cd.detectChanges();
    if (this.isLoaded()) this.emitOnChangedData();
  }

  public getWeatherByLocation(location: ILocation): void {
    if(this.isSentRequest) return;
    this.isSentRequest = true;

    this.mainPageWeatherService.getWeatherByCoords(location.coords)
      .subscribe(weather => {
        this.weather = weather;
        this.cd.detectChanges();
        this.isSentRequest = false;
      }, () => this.isSentRequest = false);
  }

}

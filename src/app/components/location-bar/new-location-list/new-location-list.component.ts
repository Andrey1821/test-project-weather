import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Unsubscriber } from '../../../decorators/unsubscriver';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-location-list',
  templateUrl: './new-location-list.component.html',
  styleUrls: ['./new-location-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Unsubscriber
export class NewLocationListComponent implements OnInit, OnDestroy {
  @Input() public onChangesLocations$: BehaviorSubject<INewLocationConfig | undefined>;
  @Output() public onClick = new EventEmitter<ILocation>();
  public locations: ILocation[];
  public basicUserLocation: ILocation;
  public savedLocations: ILocation[] = [];
  private componentDestroy: () => Observable<unknown>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribeOnChangesLocations();
  }

  public btnClick(location: ILocation): void {
    this.onClick.emit(location);
  }

  private subscribeOnChangesLocations(): void {
    this.onChangesLocations$
      .pipe(
        filter(v => !!v),
        takeUntil(this.componentDestroy())
      )
      .subscribe(config => {
        this.initData(config!);
        this.filterLocations();
        this.cd.detectChanges();
      });
  }

  private initData(newLocationsConfig: INewLocationConfig): void {
    const {locations, basicUserLocation, savedLocations} = newLocationsConfig;
    this.locations = locations;
    this.savedLocations = savedLocations;
    this.basicUserLocation = basicUserLocation;
  }

  private filterLocations(): void {
    const commonArray = [...this.savedLocations, this.basicUserLocation];
    this.locations = this.locations.filter(location => {
      return !commonArray.find(savedLocation => savedLocation?.id === location.id);
    });
  }

  ngOnDestroy(): void {
  }
}

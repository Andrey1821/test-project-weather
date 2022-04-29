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
import { Observable, Subject } from 'rxjs';
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
  @Input() public locations: ILocation[];
  @Input() public basicUserLocation: ILocation;
  @Input() public savedLocations: ILocation[] = [];
  @Input() public onChangesLocations$: Subject<void>;
  @Output() public onClick = new EventEmitter<ILocation>();
  private componentDestroy: () => Observable<unknown>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribeOnChangesLocations();
  }

  private subscribeOnChangesLocations(): void {
    this.onChangesLocations$
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe(() => {
        this.filterLocations();
        this.cd.detectChanges();
      });
  }

  private filterLocations(): void {
    const commonArray = [...this.savedLocations, this.basicUserLocation];
    this.locations = this.locations.filter(location => {
      return !commonArray.find(savedLocation => savedLocation?.id === location.id);
    });
  }

  public btnClick(location: ILocation): void {
    this.onClick.emit(location);
  }


  ngOnDestroy(): void {
  }
}

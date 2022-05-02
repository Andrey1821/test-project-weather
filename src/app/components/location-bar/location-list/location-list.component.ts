import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PaginationTransmitterService } from '../../../pagination/pagination/pagination-transmitter.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [PaginationTransmitterService]
})
export class LocationListComponent {
  @Input() public basicUserLocation: ILocation;
  @Input() public savedLocations: ILocation[];
  @Output() public onLocationClick = new EventEmitter<ILocation>();
  @Output() public onIconClick = new EventEmitter<ILocation>();
  public showingLocations: ILocation[];

  constructor(private cd: ChangeDetectorRef) {
  }

  public refreshList(locations: ILocation[]): void {
    this.showingLocations = [...locations];
    this.cd.detectChanges();
  }

  public emitLocationClick(location: ILocation): void {
    this.onLocationClick.emit(location);
  }

  public emitIconClick(location: ILocation): void {
    this.onIconClick.emit(location);
  }
}

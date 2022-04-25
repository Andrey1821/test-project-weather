import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationListComponent {
  @Input() public basicUserLocation: ILocation;
  @Input() public savedLocations: ILocation[];
  @Output() public onClick = new EventEmitter<ILocation>();
}

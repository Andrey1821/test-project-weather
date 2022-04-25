import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationItemComponent {
  @Input() public location: ILocation;
}

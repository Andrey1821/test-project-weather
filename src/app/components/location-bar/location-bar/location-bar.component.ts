import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-location-bar',
  templateUrl: './location-bar.component.html',
  styleUrls: ['./location-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationBarComponent {
  @Input() public title: string;
}

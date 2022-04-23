import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-selected-location-bar',
  templateUrl: './selected-location-bar.component.html',
  styleUrls: ['./selected-location-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectedLocationBarComponent implements OnInit {
  @Input() public basicUserLocation: ILocation;
  constructor() { }

  ngOnInit(): void {
  }

}

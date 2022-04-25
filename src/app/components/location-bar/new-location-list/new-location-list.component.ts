import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-location-list',
  templateUrl: './new-location-list.component.html',
  styleUrls: ['./new-location-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewLocationListComponent {
  @Input() public locations: ILocation[];
  @Output() public onClick = new EventEmitter<ILocation>();

  public btnClick(location: ILocation): void {
    this.onClick.emit(location);
  }
}

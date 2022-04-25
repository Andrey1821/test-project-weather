import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-locations-container',
  templateUrl: './new-locations-container.component.html',
  styleUrls: ['./new-locations-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewLocationsContainerComponent {
  public isVisibleBody = false;

  public toggleVisibility(): void {
    this.isVisibleBody = !this.isVisibleBody;
  }
}

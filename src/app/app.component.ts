import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreService } from "./searvices/store.service";
import { LocationTransformerService } from "./searvices/transformers/location-transformer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private store: StoreService,
    private locationTransformerService: LocationTransformerService
  ) {
  }

  ngOnInit(): void {
    this.setUserLocation();
  }

  private setUserLocation(): void {
    navigator.geolocation.getCurrentPosition((data) => {
      const location = this.locationTransformerService.transformToLocation(data);
      this.store.userLocation.updateValue(location);
    })
  }

}

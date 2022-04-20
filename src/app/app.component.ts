import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreService } from './searvices/store.service';
import { CoordsGeolocationTransformerService } from './searvices/transformers/coords/coords-geolocation-transformer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private store: StoreService,
    private coordsTransformerService: CoordsGeolocationTransformerService
  ) {
  }

  ngOnInit(): void {
    this.setUserCoords();
  }

  private setUserCoords(): void {
    navigator.geolocation.getCurrentPosition((geoLocation) => {
      const coords = this.coordsTransformerService.transform(geoLocation);
      this.store.updateStoreValue(coords, this.store.userCoords);
    })
  }

}

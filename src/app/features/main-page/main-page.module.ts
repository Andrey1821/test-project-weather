import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { SelectedLocationBarComponent } from '../../components/selected-cities-bar/selected-location-bar.component';
import { WeatherComponent } from '../../components/weather/weather.component';


@NgModule({
  declarations: [
    MainPageComponent,
    SelectedLocationBarComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule {
}

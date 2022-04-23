import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { SelectedLocationBarComponent } from '../../components/selected-cities-bar/selected-location-bar.component';
import { WeatherModule } from '../../components/weather/weather.module';


@NgModule({
  declarations: [
    MainPageComponent,
    SelectedLocationBarComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    WeatherModule
  ]
})
export class MainPageModule {
}

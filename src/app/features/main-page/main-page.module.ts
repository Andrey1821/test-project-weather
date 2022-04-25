import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { WeatherModule } from '../../components/weather/weather.module';
import { LocationBarModule } from '../../components/location-bar/location-bar.module';


@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    WeatherModule,
    LocationBarModule
  ]
})
export class MainPageModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { WeatherPageRoutingModule } from "./weather-page-routing.module";


@NgModule({
  declarations: [
    WeatherPageComponent
  ],
  imports: [
    CommonModule,
    WeatherPageRoutingModule
  ]
})
export class WeatherPageModule {
}

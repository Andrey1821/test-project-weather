import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { DegreePipe } from './pipes/degree.pipe';
import { WindDirectionPipe } from './pipes/wind-direction.pipe';
import { SpeedPipe } from './pipes/speed.pipe';

@NgModule({
  declarations: [WeatherComponent, DegreePipe, WindDirectionPipe, SpeedPipe],
  imports: [
    CommonModule
  ],
  exports: [WeatherComponent, DegreePipe]
})
export class WeatherModule { }

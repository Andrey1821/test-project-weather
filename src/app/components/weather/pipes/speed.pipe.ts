import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: number, measurement: string): string {
    return Math.round(value) + measurement;
  }

}

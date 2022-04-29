import { Pipe, PipeTransform } from '@angular/core';
import { WIND_ENUM } from '../../../enums/wind.enum';

@Pipe({
  name: 'windDirection'
})
export class WindDirectionPipe implements PipeTransform {

  transform(windDegree: number): string | void {
    const windDirections: Array<Array<string>> = [
      [WIND_ENUM[0], WIND_ENUM[1]],
      [WIND_ENUM[90], WIND_ENUM[91]],
      [WIND_ENUM[180], WIND_ENUM[181]],
      [WIND_ENUM[270], WIND_ENUM[271]]
    ];

    const basicWindDegree: Array<number> = [
      WIND_ENUM.N,
      WIND_ENUM.E,
      WIND_ENUM.S,
      WIND_ENUM.W
    ];
    let result: string | undefined;

    if(windDegree > WIND_ENUM['NW']) {
      result = WIND_ENUM[271];
      return result;
    }

    basicWindDegree.forEach((deg, index) => {
      if (windDegree === deg) {
        result = windDirections[index][0];
      }
      if (windDegree > deg && windDegree < basicWindDegree[index + 1]) {
        result = windDirections[index][1];
      }
    });
    return result;
  }

}

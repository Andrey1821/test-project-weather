import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {

  transform(value: number): string | undefined {
    return Math.round(value) + '\u00B0' + 'C';
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'azenpipom'
})
export class AzenpipomPipe implements PipeTransform {

  transform(value: any, times: number): any {
    return value.repeat(times);
  }

}

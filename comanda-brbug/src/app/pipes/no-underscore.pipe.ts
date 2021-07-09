import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noUnderscore'
})
export class NoUnderscorePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if(value!=null){
      return value.replace("_", " ");
    }

  }

}

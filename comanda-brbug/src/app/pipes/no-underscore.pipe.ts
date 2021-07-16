import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noUnderscore'
})
export class NoUnderscorePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if(value!=null){
      if(value=="confirmacion_pago"){
        return "El mozo está confirmando el pago";
      }else{
        let s = value.charAt(0).toUpperCase() + value.slice(1);
        return s.split('_').join(' ');
      }
    }

  }

}

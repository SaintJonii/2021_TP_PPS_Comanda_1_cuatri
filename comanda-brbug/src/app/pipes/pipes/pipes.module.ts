import { NgModule } from '@angular/core';
import { NoUnderscorePipe } from '../no-underscore.pipe';



@NgModule({
  declarations: [NoUnderscorePipe],
  exports: [NoUnderscorePipe]
})
export class PipesModule { }

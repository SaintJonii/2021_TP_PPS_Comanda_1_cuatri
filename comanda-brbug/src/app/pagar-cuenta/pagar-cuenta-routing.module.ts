import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarCuentaPage } from './pagar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: PagarCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarCuentaPageRoutingModule {}

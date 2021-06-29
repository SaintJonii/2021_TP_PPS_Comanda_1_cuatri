import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionProdPage } from './seleccion-prod.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionProdPageRoutingModule {}

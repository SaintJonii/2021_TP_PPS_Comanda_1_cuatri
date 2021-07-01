import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEntregasPage } from './lista-entregas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEntregasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEntregasPageRoutingModule {}

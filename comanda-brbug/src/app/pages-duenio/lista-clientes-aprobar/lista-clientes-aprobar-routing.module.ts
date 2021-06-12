import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaClientesAprobarPage } from './lista-clientes-aprobar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaClientesAprobarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaClientesAprobarPageRoutingModule {}

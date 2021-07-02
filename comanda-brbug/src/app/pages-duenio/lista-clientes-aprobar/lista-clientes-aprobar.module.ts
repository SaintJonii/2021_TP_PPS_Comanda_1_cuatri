import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaClientesAprobarPageRoutingModule } from './lista-clientes-aprobar-routing.module';

import { ListaClientesAprobarPage } from './lista-clientes-aprobar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaClientesAprobarPageRoutingModule
  ],
  declarations: [ListaClientesAprobarPage]
})
export class ListaClientesAprobarPageModule {}

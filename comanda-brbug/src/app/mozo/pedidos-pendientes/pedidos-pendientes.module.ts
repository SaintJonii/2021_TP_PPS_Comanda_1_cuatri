import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPendientesPageRoutingModule } from './pedidos-pendientes-routing.module';

import { PedidosPendientesPage } from './pedidos-pendientes.page';
import { PedidosPendientesModalComponent } from '../pedidos-pendientes-modal/pedidos-pendientes-modal.component';
import { NavComponent } from 'src/app/components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPendientesPageRoutingModule
  ],
  declarations: [PedidosPendientesPage, PedidosPendientesModalComponent, NavComponent],
  entryComponents: [PedidosPendientesModalComponent]
})
export class PedidosPendientesPageModule {}

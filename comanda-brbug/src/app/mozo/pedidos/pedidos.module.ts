import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule
  ],
  declarations: [PedidosPage, DetallePedidoComponent],
  entryComponents: [DetallePedidoComponent]
})
export class PedidosPageModule {}

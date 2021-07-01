import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoPedidoPageRoutingModule } from './estado-pedido-routing.module';

import { EstadoPedidoPage } from './estado-pedido.page';
import { NavComponent } from '../components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoPedidoPageRoutingModule
  ],
  declarations: [EstadoPedidoPage,NavComponent]
})
export class EstadoPedidoPageModule {}

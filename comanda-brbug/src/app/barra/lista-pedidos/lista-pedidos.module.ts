import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosPageRoutingModule } from './lista-pedidos-routing.module';

import { ListaPedidosPage } from './lista-pedidos.page';
import { NavComponent } from 'src/app/components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosPageRoutingModule
  ],
  declarations: [ListaPedidosPage , NavComponent]
})
export class ListaPedidosPageModule {}

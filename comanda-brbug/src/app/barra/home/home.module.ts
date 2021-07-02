import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ListaPedidosModalComponent } from '../lista-pedidos-modal/lista-pedidos-modal.component';
import { NavComponent } from 'src/app/components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ListaPedidosModalComponent, NavComponent],
  entryComponents: [ListaPedidosModalComponent]
})
export class HomePageModule {}

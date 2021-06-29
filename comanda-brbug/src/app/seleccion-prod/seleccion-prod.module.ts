import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavComponent } from './../components/nav/nav.component';
import { SeleccionProdPageRoutingModule } from './seleccion-prod-routing.module';

import { SeleccionProdPage } from './seleccion-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionProdPageRoutingModule
  ],
  declarations: [SeleccionProdPage, NavComponent]
})
export class SeleccionProdPageModule {}

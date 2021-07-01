import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarCuentaPageRoutingModule } from './pagar-cuenta-routing.module';

import { PagarCuentaPage } from './pagar-cuenta.page';
import { NavComponent } from './../components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarCuentaPageRoutingModule
  ],
  declarations: [PagarCuentaPage, NavComponent]
})
export class PagarCuentaPageModule {}

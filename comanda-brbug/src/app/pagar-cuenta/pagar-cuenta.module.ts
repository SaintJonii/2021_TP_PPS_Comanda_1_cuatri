import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarCuentaPageRoutingModule } from './pagar-cuenta-routing.module';

import { PagarCuentaPage } from './pagar-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarCuentaPageRoutingModule
  ],
  declarations: [PagarCuentaPage]
})
export class PagarCuentaPageModule {}

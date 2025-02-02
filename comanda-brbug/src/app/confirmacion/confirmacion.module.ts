import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavComponent } from './../components/nav/nav.component';
import { ConfirmacionPageRoutingModule } from './confirmacion-routing.module';
import { ConfirmacionPage } from './confirmacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionPageRoutingModule
  ],
  declarations: [ConfirmacionPage, NavComponent]
})
export class ConfirmacionPageModule {}

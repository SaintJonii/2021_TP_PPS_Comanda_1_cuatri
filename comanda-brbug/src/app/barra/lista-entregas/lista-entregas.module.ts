import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEntregasPageRoutingModule } from './lista-entregas-routing.module';

import { ListaEntregasPage } from './lista-entregas.page';
import { NavComponent } from 'src/app/components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEntregasPageRoutingModule
  ],
  declarations: [ListaEntregasPage, NavComponent]
})
export class ListaEntregasPageModule {}

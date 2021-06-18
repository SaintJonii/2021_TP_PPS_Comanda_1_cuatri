import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';
import { MesasModalComponent } from '../mesas-modal/mesas-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule
  ],
  declarations: [ListaPage, MesasModalComponent],
  entryComponents: [MesasModalComponent]
})
export class ListaPageModule {}

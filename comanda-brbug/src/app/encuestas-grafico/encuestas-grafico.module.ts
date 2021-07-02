import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestasGraficoPageRoutingModule } from './encuestas-grafico-routing.module';

import { EncuestasGraficoPage } from './encuestas-grafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestasGraficoPageRoutingModule
  ],
  declarations: [EncuestasGraficoPage]
})
export class EncuestasGraficoPageModule {}

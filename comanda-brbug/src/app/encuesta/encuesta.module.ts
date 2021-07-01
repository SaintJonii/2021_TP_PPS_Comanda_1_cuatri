import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaPageRoutingModule } from './encuesta-routing.module';

import { EncuestaPage } from './encuesta.page';
import { NavComponent } from '../components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaPageRoutingModule
  ],
  declarations: [EncuestaPage, NavComponent]
})
export class EncuestaPageModule {}

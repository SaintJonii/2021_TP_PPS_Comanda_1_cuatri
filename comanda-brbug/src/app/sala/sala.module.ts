import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavComponent } from './../components/nav/nav.component';
import { SalaPageRoutingModule } from './sala-routing.module';

import { SalaPage } from './sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaPageRoutingModule
  ],
  declarations: [SalaPage, NavComponent]
})
export class SalaPageModule {}

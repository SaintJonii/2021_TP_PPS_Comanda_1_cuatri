import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuenioSupervisorPageRoutingModule } from './duenio-supervisor-routing.module';

import { DuenioSupervisorPage } from './duenio-supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DuenioSupervisorPageRoutingModule
  ],
  declarations: [DuenioSupervisorPage]
})
export class DuenioSupervisorPageModule {}

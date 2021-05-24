import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuenioSupervisorPage } from './duenio-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: DuenioSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuenioSupervisorPageRoutingModule {}

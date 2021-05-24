import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'duenio-supervisor',
    loadChildren: () => import('./altas/duenio-supervisor/duenio-supervisor.module').then( m => m.DuenioSupervisorPageModule)
  },
  {
    path: 'mesa',
    loadChildren: () => import('./altas/mesa/mesa.module').then( m => m.MesaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

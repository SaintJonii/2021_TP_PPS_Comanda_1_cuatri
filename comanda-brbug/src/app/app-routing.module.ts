import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./altas/alta-cliente/alta-cliente.module').then( m => m.AltaClientePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sala',
    loadChildren: () => import('./sala/sala.module').then( m => m.SalaPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'confirmacion', component: ConfirmacionComponent
  },
  {
    path: 'homeMozo',
    loadChildren: () => import('./mozo/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'listaMozo',
    loadChildren: () => import('./mozo/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'pedidosMozo',
    loadChildren: () => import('./mozo/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pendientesMozo',
    loadChildren: () => import('./mozo/pedidos-pendientes/pedidos-pendientes.module').then( m => m.PedidosPendientesPageModule)
  },
  {
    path: 'homeCocina',
    loadChildren: () => import('./cocina/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'prepararCocina',
    loadChildren: () => import('./cocina/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'entregasCocina',
    loadChildren: () => import('./cocina/entregas/entregas.module').then( m => m.EntregasPageModule)
  },
  {
    path: 'homeBarra',
    loadChildren: () => import('./barra/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'prepararBarra',
    loadChildren: () => import('./barra/lista-pedidos/lista-pedidos.module').then( m => m.ListaPedidosPageModule)
  },
  {
    path: 'entregasBarra',
    loadChildren: () => import('./barra/lista-entregas/lista-entregas.module').then( m => m.ListaEntregasPageModule)
  }
  


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

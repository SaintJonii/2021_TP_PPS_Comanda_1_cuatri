
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'lista-clientes-aprobar',
    loadChildren: () => import('./pages-duenio/lista-clientes-aprobar/lista-clientes-aprobar.module').then( m => m.ListaClientesAprobarPageModule)
  },
  {
    path: 'home-duenio',
    loadChildren: () => import('./pages-duenio/home-duenio/home-duenio.module').then( m => m.HomeDuenioPageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
  {
    path: 'sala',
    loadChildren: () => import('./sala/sala.module').then( m => m.SalaPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'confirmacion',
    loadChildren: () => import('./confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./altas/alta-cliente/alta-cliente.module').then( m => m.AltaClientePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  /* {
    path: 'confirmacion', component: ConfirmacionComponent
  }, */
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
    path: 'estado-pedido',
    loadChildren: () => import('./estado-pedido/estado-pedido.module').then( m => m.EstadoPedidoPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'encuestas-grafico',
    loadChildren: () => import('./encuestas-grafico/encuestas-grafico.module').then( m => m.EncuestasGraficoPageModule)
  }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

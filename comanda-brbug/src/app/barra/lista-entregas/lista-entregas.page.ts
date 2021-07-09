import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-lista-entregas',
  templateUrl: './lista-entregas.page.html',
  styleUrls: ['./lista-entregas.page.scss'],
})
export class ListaEntregasPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;
  public spinner : boolean = true;
  titulo = "Lista de Pedidos";
  
  constructor(private db: StoreService, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.db.obtenerBebidasAEntregar().subscribe(data => {
      this.pedidos = data;
      if(this.pedidos.length != 0){
        this.pedidosPendientes = true;
      }
      else{
        this.pedidosPendientes = false;
      }
    })
  }

  entregarPedido(pedido){
    this.db.entregarPedido(pedido.mesa, false);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.spinner = false;
    }, 2000);
  }

}
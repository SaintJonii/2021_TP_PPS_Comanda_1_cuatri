import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PushService } from 'src/app/services/push.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;
  public spinner : boolean = true;
  titulo = "Lista de Pedidos";
  
  constructor(private db: StoreService, private router: Router, public loadingController: LoadingController, private pushSvc: PushService) { }

  ngOnInit() {
    this.presentLoading();
    this.db.obtenerPedidosAEntregar().subscribe(data => {
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
    this.db.entregarPedido(pedido.mesa, true);
    
    this.db.obtenerTokenMozo().subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvc.sendNotification("Pedido Listo", "Sector: Cocina", token);
    }
    );
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
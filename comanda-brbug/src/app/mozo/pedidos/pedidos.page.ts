import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;
  public spinner : boolean = true;

  constructor(private db : StoreService, private modalCtrl: ModalController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.db.obtenerPedidosAConfirmar().subscribe(data => {
      this.pedidos = data;
      if(this.pedidos.length != 0){
        this.pedidosPendientes = true;
      }
      else{
        this.pedidosPendientes = false;
      }
    })
  }

  async openModal(pedido) {
    const modal = await this.modalCtrl.create({
      component: DetallePedidoComponent,
      componentProps: {pedido: pedido}
    });

    await modal.present();
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

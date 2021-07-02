import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { ListaPedidosModalComponent } from '../lista-pedidos-modal/lista-pedidos-modal.component';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;
  public spinner : boolean = true;

  constructor(private db : StoreService, private modalCtrl: ModalController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.db.obtenerBebidasAPreparar().subscribe(data => {
      this.pedidos = data;
      console.log(this.pedidos);
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
      component: ListaPedidosModalComponent,
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
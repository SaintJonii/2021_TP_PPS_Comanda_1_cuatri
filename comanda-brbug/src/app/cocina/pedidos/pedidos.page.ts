import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { PedidoModalComponent } from '../pedido-modal/pedido-modal.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;

  constructor(private db : StoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.obtenerPedidosAPreparar().subscribe(data => {
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
      component: PedidoModalComponent,
      componentProps: {pedido: pedido}
    });

    await modal.present();
  }

}
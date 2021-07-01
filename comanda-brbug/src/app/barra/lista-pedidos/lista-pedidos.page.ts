import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private db : StoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.obtenerBebidasAPreparar().subscribe(data => {
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
      component: ListaPedidosModalComponent,
      componentProps: {pedido: pedido}
    });

    await modal.present();
  }

}
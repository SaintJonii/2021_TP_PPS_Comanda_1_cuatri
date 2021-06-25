import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { PedidosPendientesModalComponent } from '../pedidos-pendientes-modal/pedidos-pendientes-modal.component';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;

  constructor(private db : StoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.obtenerPedidos().subscribe(data => {
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
      component: PedidosPendientesModalComponent,
      componentProps: {pedido: pedido}
    });

    await modal.present();
  }

}
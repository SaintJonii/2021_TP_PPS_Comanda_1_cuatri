import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pedidos-pendientes-modal',
  templateUrl: './pedidos-pendientes-modal.component.html',
  styleUrls: ['./pedidos-pendientes-modal.component.scss'],
})
export class PedidosPendientesModalComponent implements OnInit {
  @Input() pedido: any;

  public estado: string;
  public pedidoPendiente: boolean = false;

  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router) { }

  ngOnInit() {
    this.estado = this.pedido.estado;
    if(this.estado == 'despachado' || this.estado == 'preparandolo' || this.estado == 'listo_para_servir'){
      this.pedidoPendiente = true;
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  despacharPedido(){
    console.log(this.pedido.mesa);
    this.db.servirPedido(this.pedido.mesa);
    this.dismissModal();
    this.router.navigateByUrl('pendientesMozo');
  }

  capitalizeFirstLetter(string) {
    var s = string.charAt(0).toUpperCase() + string.slice(1);
    return s.split('_').join(' ');
  }

}
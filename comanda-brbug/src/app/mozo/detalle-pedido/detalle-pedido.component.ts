import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent implements OnInit {
  @Input() pedido: any;

  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  despacharPedido(){
    console.log(this.pedido.mesa);
    this.db.despacharPedido(this.pedido.mesa);
    this.dismissModal();
    this.router.navigateByUrl('pedidosMozo');
  }

}
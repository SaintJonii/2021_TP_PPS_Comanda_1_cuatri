import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pedido-modal',
  templateUrl: './pedido-modal.component.html',
  styleUrls: ['./pedido-modal.component.scss'],
})
export class PedidoModalComponent implements OnInit {
  @Input() pedido: any;
  titulo = "Detalle Pedido";
  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router) { }

  ngOnInit() {
    console.log(this.pedido);
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  prepararPedido(){
    this.db.prepararPedido(this.pedido.mesa, true);
    this.dismissModal();
    this.router.navigateByUrl('prepararCocina');
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
    this.modalCtrl.dismiss();
  }

}
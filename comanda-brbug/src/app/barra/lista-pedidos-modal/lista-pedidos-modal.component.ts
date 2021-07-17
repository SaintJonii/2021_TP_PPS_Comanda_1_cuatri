import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-lista-pedidos-modal',
  templateUrl: './lista-pedidos-modal.component.html',
  styleUrls: ['./lista-pedidos-modal.component.scss'],
})
export class ListaPedidosModalComponent implements OnInit {
  @Input() pedido: any;
  titulo = "Detalle Pedido";
  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router) { }

  ngOnInit() {
    
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  prepararPedido(){
    console.log(this.pedido.mesa);
    this.db.prepararPedido(this.pedido.mesa, false);
    this.dismissModal();
    this.router.navigateByUrl('homeBarra');
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
    this.modalCtrl.dismiss();
  }

}
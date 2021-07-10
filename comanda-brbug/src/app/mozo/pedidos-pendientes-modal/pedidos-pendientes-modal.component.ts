import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-pedidos-pendientes-modal',
  templateUrl: './pedidos-pendientes-modal.component.html',
  styleUrls: ['./pedidos-pendientes-modal.component.scss'],
})
export class PedidosPendientesModalComponent implements OnInit {
  @Input() pedido: any;
  titulo = "Detalle Pedido";
  public estado: string;
  public pedidoPendiente: boolean = false;

  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router, private pushSvce : PushService) { }

  ngOnInit() {
    this.estado = this.pedido.estado;
    if(this.estado == 'despachado' || this.estado == 'preparandolo' || this.estado == 'listo_para_servir'){
      this.pedidoPendiente = true;
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  servirPedido(){
    console.log(this.pedido.mesa);
    this.db.servirPedido(this.pedido.mesa);
    this.dismissModal();
    this.router.navigateByUrl('pendientesMozo');

    this.db.obtenerTokenCliente(this.pedido.cliente).subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvce.sendNotification("Pedido Listo", "Confirme recepción del pedido", token);
    }
    );
    
  }

  finalizarPedido(){
    this.db.liberarMesa(this.pedido.mesa);
    this.db.actualizarEstadoDelPedido("finalizado", this.pedido.mesa);
  }

  capitalizeFirstLetter(string) {
    var s = string.charAt(0).toUpperCase() + string.slice(1);
    return s.split('_').join(' ');
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
    this.modalCtrl.dismiss();
  }

}
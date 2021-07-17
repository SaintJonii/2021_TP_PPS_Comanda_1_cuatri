import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PushService } from 'src/app/services/push.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent implements OnInit {
  @Input() pedido: any;
  titulo = "Detalle Pedido";
  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router, private pushSvc: PushService) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  despacharPedido(){
    //console.log(this.pedido.mesa);
    this.db.despacharPedido(this.pedido.mesa);
    this.dismissModal();
    this.router.navigateByUrl('pedidosMozo');

    this.db.obtenerTokenCocina().subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvc.sendNotification("Nuevo Pedido", "Confirme recepción del pedido", token);
    }
    );

    this.db.obtenerTokenBarra().subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvc.sendNotification("Nuevo Pedido", "Confirme recepción del pedido", token);
    }
    );
  }

  rechazarPedido(){
    this.db.rechazarPedido(this.pedido.mesa);
    this.dismissModal();
    this.router.navigateByUrl('pedidosMozo');
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
    this.modalCtrl.dismiss();
  }

}
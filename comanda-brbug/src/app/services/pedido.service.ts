import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { StoreService } from './store.service';
import { PushService } from './push.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  users: any = [];

  constructor(private afs: AngularFirestore, private storeSv: StoreService, private pushSvc: PushService) { }

  confirmacionCliente(pedido, mesa, cliente, total, tiempoEstimado) {
    this.afs.collection('pedidos').doc(mesa).set(
      {
        pedido: pedido,
        estado: "pendiente_confirmacion",
        total: total,
        mesa: mesa,
        cliente: cliente,
        tiempoEstimado: tiempoEstimado //<--NUEVO
      }
    );

    this.storeSv.obtenerTokenMozo().subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvc.sendNotification("Pedido a confirmar", "Nuevo Pedido", token);
    }
    );
  }

  buscarPedido(dni) {
    return this.afs.collection('pedidos', ref => ref.where('cliente', '==', dni)).valueChanges();
  }

  buscarMesa(nroMesa) {
    return this.afs.collection('mesas').doc(nroMesa).valueChanges();
  }

  actualizarPropina(nroMesa, propina, propinaPorcentaje){
    this.afs.collection("pedidos").doc(nroMesa).update({
      propinaPorcentaje: propinaPorcentaje,
      propina: propina
    });
  }


}

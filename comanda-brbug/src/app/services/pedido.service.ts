import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  users: any = [] ;

  constructor(private afs: AngularFirestore) { }

  confirmacionCliente(pedido, mesa, cliente, total){
    this.afs.collection('pedidos').doc(mesa).set(
      {
        pedido: pedido,
        estado: "pendiente_confirmacion",
        total: total,
        mesa: mesa,
        cliente: cliente
      }
    );

  }


}

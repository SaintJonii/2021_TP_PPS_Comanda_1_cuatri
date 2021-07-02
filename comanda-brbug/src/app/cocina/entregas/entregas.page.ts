import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;

  constructor(private db: StoreService, private router: Router) { }

  ngOnInit() {
    this.db.obtenerPedidosAEntregar().subscribe(data => {
      this.pedidos = data;
      if(this.pedidos.length != 0){
        this.pedidosPendientes = true;
      }
      else{
        this.pedidosPendientes = false;
      }
    })
  }

  entregarPedido(pedido){
    this.db.entregarPedido(pedido.mesa, true);
    console.log('aaa');
  }

}
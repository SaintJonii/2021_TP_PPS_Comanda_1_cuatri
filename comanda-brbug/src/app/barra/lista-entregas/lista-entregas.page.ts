import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-lista-entregas',
  templateUrl: './lista-entregas.page.html',
  styleUrls: ['./lista-entregas.page.scss'],
})
export class ListaEntregasPage implements OnInit {
  public pedidos : any [] = [];
  public pedidosPendientes : boolean = false;

  constructor(private db: StoreService, private router: Router) { }

  ngOnInit() {
    this.db.obtenerBebidasAEntregar().subscribe(data => {
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
    this.db.entregarPedido(pedido.mesa, false);
  }

}
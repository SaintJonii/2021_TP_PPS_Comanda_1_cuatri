import { Component, OnInit } from '@angular/core';
import { Pedido } from '../classes/pedido';
import { Router } from '@angular/router'

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  pedido: Array<Pedido>;
  total;
  constructor(private routerNav: Router) {
    this.pedido = JSON.parse(localStorage.getItem("pedidoActual"));
    this.calcularTotal();
  }

  ngOnInit() {
  }

  eliminarItem(p) {
    let idx = this.pedido.indexOf(p);
    if (idx > -1) {
      this.pedido.splice(idx, 1);
    }
    localStorage.setItem("pedidoActual", JSON.stringify(this.pedido));
    this.calcularTotal();
  }

  calcularTotal() {
    let totales = [];
    totales = this.pedido.map(function (x) {
      return x.unidades * x.producto.precio;
    });

    let sum=0;
    totales.forEach(function (numero) {
      sum += numero;
    });
    this.total = sum;
  }

  volver() {
    this.routerNav.navigateByUrl('menu');
  }

  ionViewWillEnter(){
    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
    }
  }

}

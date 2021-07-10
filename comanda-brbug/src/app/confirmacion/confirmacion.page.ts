import { Component, OnInit } from '@angular/core';
import { Pedido } from '../classes/pedido';
import { Router } from '@angular/router'
import { PedidoService } from './../services/pedido.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  titulo= "Mi Pedido";
  pedido: Array<Pedido>;
  total;
  mesaCliente;
  usuario;

  constructor(private routerNav: Router, private pedidoSvice: PedidoService, private toastController: ToastController, private loadingController: LoadingController) {
    this.mesaCliente = localStorage.getItem("nro_mesa");
  
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));

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

  confirmar(){
    this.pedidoSvice.confirmacionCliente(this.pedido, this.mesaCliente, this.usuario.dni, this.total);
    localStorage.removeItem("pedidoActual");
    setTimeout(() => {
      this.routerNav.navigateByUrl('sala');
    }, 3000);
  }

  volver() {
    this.routerNav.navigateByUrl('menu');
  }

  chat(){
    this.routerNav.navigateByUrl('chat');
  }

  ionViewWillEnter(){
    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
    }
  }

 

}

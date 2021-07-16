import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { Pedido } from 'src/app/classes/pedido';
import { Router } from '@angular/router'
import { Imagen } from 'src/app/classes/imagen';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seleccion-prod',
  templateUrl: './seleccion-prod.page.html',
  styleUrls: ['./seleccion-prod.page.scss'],
})
export class SeleccionProdPage implements OnInit {

  producto: Producto;
  pedidos: Array<Pedido>;
  imagenes: Array<Imagen>;
  unidades: number;
  titulo;
  opcion;

  constructor(private router: ActivatedRoute, private routerNav: Router) {
    this.unidades = 1;
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params) {
        this.producto = JSON.parse(params['producto']);
        this.imagenes = this.producto.imagen;
        this.titulo = this.producto.nombre;
        this.opcion = null;
      }

    });

    this.pedidos = new Array<Pedido>();

    if (localStorage.getItem("pedidoActual") != null) {
      this.pedidos = JSON.parse(localStorage.getItem("pedidoActual"));
    }
  }

  sumar() {
    this.unidades += 1;
  }

  restar() {
    if (this.unidades != 1) {
      this.unidades -= 1;
    }
  }

  agregarOpcion(e): void {
    this.opcion = e.currentTarget.value;

  }

  enviarPedido() {
    let pedido: Pedido = new Pedido();
    pedido.producto = this.producto;
    pedido.producto.opciones = this.opcion;
    pedido.unidades = this.unidades;
    this.pedidos.push(pedido);
    localStorage.setItem("pedidoActual", JSON.stringify(this.pedidos));
    this.routerNav.navigateByUrl("menu");
  }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { Pedido } from 'src/app/classes/pedido';
import { Router } from '@angular/router'
import { Imagen } from 'src/app/classes/imagen';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss'],
})
export class SeleccionComponent implements OnInit {

  @Input() producto: Producto;
  @Output() pedido = new EventEmitter<any>();
  imagenes:Array<Imagen>;
  unidades:number;

  constructor(private routerNav: Router) {
    this.unidades = 1;
   }

  ngOnInit() {
    this.imagenes = this.producto.imagen;
  }

  sumar(){  
    this.unidades += 1;
  }

  restar(){
    if(this.unidades != 1){
      this.unidades -= 1;
    }
  }

  enviarPedido(){
    let pedido: Pedido = new Pedido();
    pedido.producto = this.producto;
    pedido.unidades = this.unidades;
    this.pedido.emit(pedido);
  }

  volver(){
    this.pedido.emit(null);
  }
}

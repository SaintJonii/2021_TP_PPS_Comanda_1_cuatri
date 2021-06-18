import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Producto } from '../classes/producto';
import { Imagen } from '../classes/imagen';
import * as firebase from 'firebase';
import { Pedido } from '../classes/pedido';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  imagenes:Array<Imagen>;
  productos:Array<Producto>;
  mostrarSeleccion: Boolean;
  productoSel:Producto;
  pedido: Array<Pedido>;
  mesaCLiente;

  constructor(private afs: AngularFirestore, private route : Router, public toastController: ToastController) {
    this.mostrarSeleccion = false;
    this.mesaCLiente = localStorage.getItem("nro_mesa");
    this.toastPedido("Asignado a mesa nro: " + this.mesaCLiente);
   }

  ngOnInit() {
    this.pedido = new Array<Pedido>();

    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
    }
    
    this.getProducts();
  }


  getProducts() {
    this.productos = new Array<Producto>();

    const doc1 = this.afs.collection('productos',
      ref => ref.orderBy('id', 'asc')
    );

    doc1.valueChanges()
      .subscribe(data => {
        this.productos = data as Array<Producto>;
        this.traerImagenes();
      });
  }

  traerImagenes() {

    this.imagenes = new Array<Imagen>();

    var messagesRef = firebase.default.database().ref().child("productos");
    messagesRef.on("value", (snap) => {
      var data = snap.val();

      for (var key in data) {
        this.imagenes.push(data[key]);
      }

      this.imagenes.reverse();
     
      this.setImagenes();
    });
  }

  setImagenes(){
    this.productos.map((producto)=>{
      let imagen = this.imagenes.find(x => x.id == producto.id);
      producto.imagen = imagen != undefined ? imagen.referencia : "./../../assets/logo.jpeg";
    });
  }

  seleccion(p){
    this.mostrarSeleccion = true;
    this.productoSel = p;
  } 

  enviarPedido(e){
    if(e!=null){
    this.pedido.push(e);
    this.toastPedido("Se agregó al pedido");
    }
    this.mostrarSeleccion = false;
  }

  confirmarPedido(){
    localStorage.setItem("pedidoActual", JSON.stringify(this.pedido));
    this.route.navigateByUrl('confirmacion');
  }

  async toastPedido(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  ionViewWillEnter(){
    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
    }
  }

}

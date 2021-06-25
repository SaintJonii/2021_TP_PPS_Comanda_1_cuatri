import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Producto } from '../classes/producto';
import { Imagen } from '../classes/imagen';
import firebase from 'firebase/app'
import { Pedido } from '../classes/pedido';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
  renderImages: Boolean;
  mesaCLiente;
  total;

  constructor(private afs: AngularFirestore, private route : Router, public toastController: ToastController, public loadingController: LoadingController) {
    this.mostrarSeleccion = false;
    this.mesaCLiente = localStorage.getItem("nro_mesa");
    this.renderImages = false;
   }

  ngOnInit() {
    this.pedido = new Array<Pedido>();

    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
    }

    if(!this.imagenes){
      this.presentLoading();
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

    var messagesRef = firebase.database().ref().child("productos");
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
      let imagen: Array<Imagen> = this.imagenes.filter(x => x.id == producto.id);
      producto.imagen = imagen != undefined ? imagen : null;
    });
    this.renderImages = true;
    this.toastPedido("Asignado a mesa nro: " + this.mesaCLiente);
  }

  seleccion(p){
    this.mostrarSeleccion = true;
    this.productoSel = p;
  } 

  enviarPedido(e){
    if(e!=null){
    this.pedido.push(e);
    }
    this.mostrarSeleccion = false;
    this.calcularTotal();
  }

  confirmarPedido(){
    localStorage.setItem("pedidoActual", JSON.stringify(this.pedido));
    this.route.navigateByUrl('confirmacion');
  }

  ionViewWillEnter(){
    if(localStorage.getItem("pedidoActual") != null){
      this.pedido =  JSON.parse(localStorage.getItem("pedidoActual"));
      this.calcularTotal();
    }
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


  async toastPedido(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
      duration: 2500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

}

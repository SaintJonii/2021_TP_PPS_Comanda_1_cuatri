import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Productos } from '../classes/productos';
import { Imagen } from '../classes/imagen';
import * as firebase from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public imagenes:Array<Imagen>;
  productos:Array<Productos>;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.productos = new Array<Productos>();

    const doc1 = this.afs.collection('productos',
      ref => ref.orderBy('id', 'asc')
    );

    doc1.valueChanges()
      .subscribe(data => {
        this.productos = data as Array<Productos>;
        console.log(this.productos);
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

}

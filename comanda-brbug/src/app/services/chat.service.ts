import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  usuarioActual : string = "";
  objetoJSON : string = null;
  tipo : string = null;

  constructor(private db : AngularFirestore) {
    this.objetoJSON=localStorage.getItem("usuarioActual");
    this.tipo=JSON.parse(this.objetoJSON).tipo;
    console.log(this.tipo);

    if(this.tipo=="mozo"){
      this.usuarioActual="Mozo";
    }else if(this.tipo=="cliente"){
      let mesa=localStorage.getItem("nro_mesa");
      this.usuarioActual="Mesa "+mesa;
    }
  }

  GuardarMensaje(mensaje : string, nombre : string){
    let time = Date.now();
    this.db.collection('mensajes').add({
      createdAT : time,
      msg : mensaje,
      user : nombre,
    });
  }

  ObtenerMensajes(){
    return this.db.collection('mensajes', ref => ref.orderBy('createdAT')).valueChanges();
  }
}

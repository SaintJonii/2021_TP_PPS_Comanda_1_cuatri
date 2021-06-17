import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private db : AngularFirestore) { }

  addUser(form, fotoUrl:string, tipo:string, aprobado:boolean){

    this.db.collection("users").doc(form.value.dni).set({
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      dni: form.value.dni,
      email: form.value.email,
      password: form.value.password,
      foto: fotoUrl,
      tipo: tipo,       //El tipo puede ser: cliente, dueño, supervisor, mozo, etc.
      aprobado: aprobado, // El estado del cliente empezara con false. Si es otro tipo de usuario empezara con true.
      rechazado: false
    });
    
  }

  obtenerUsuarios(){
    return this.db.collection('users').valueChanges();
  }

  obtenerUsuariosSinAprobar(){
    return this.db.collection('users' , ref => ref.where('aprobado','==',false).where('rechazado','==',false)).valueChanges();
  }

  aceptarCliente(dni : string){
    this.db.collection("users").doc(dni).update({
      aprobado: true 
    });
  }

  rechazarCliente(dni : string){
    this.db.collection("users").doc(dni).update({
      rechazado: true 
    });
  }

  modificandoNombreApellidoAnonimo(nombre : string, apellido : string){
    this.db.collection("users").doc("14444444").update({
      nombre: nombre,
      apellido: apellido
    });
  }

}

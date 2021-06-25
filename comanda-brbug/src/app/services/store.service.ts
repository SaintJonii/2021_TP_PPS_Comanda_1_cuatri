import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private db: AngularFirestore) { }

  addUser(form, fotoUrl: string, tipo: string, aprobado: boolean) {

    let time = Date.now();

    this.db.collection("users").doc(form.value.dni).set({
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      dni: form.value.dni,
      email: form.value.email,
      password: form.value.password,
      foto: fotoUrl,
      tipo: tipo,       //El tipo puede ser: cliente, dueño, supervisor, mozo, etc.
      aprobado: aprobado, // El estado del cliente empezara con false. Si es otro tipo de usuario empezara con true.
      rechazado: false,
      time: time
    });

  }

  obtenerUsuarios() {
    return this.db.collection('users').valueChanges();
  }

  obtenerUsuariosSinAprobar_order() {
    return this.db.collection('users', ref => ref.orderBy('time').where('aprobado', '==', false).where('rechazado', '==', false)).valueChanges();
  }

  obtenerUsuariosSinAprobar_no_order() {
    return this.db.collection('users', ref => ref.where('aprobado', '==', false).where('rechazado', '==', false)).valueChanges();
  }

  aceptarCliente(dni: string) {
    this.db.collection("users").doc(dni).update({
      aprobado: true
    });
  }

  rechazarCliente(dni: string) {
    this.db.collection("users").doc(dni).update({
      rechazado: true
    });
  }

  modificandoNombreApellidoAnonimo(nombre: string, apellido: string) {
    this.db.collection("users").doc("14444444").update({
      nombre: nombre,
      apellido: apellido
    });
  }

  addEncuesta(encuesta: any) {
    let time = Date.now();
    this.db.collection("encuestas").add({
      velocidad: encuesta.velocidad,
      atencion: encuesta.atencion,
      comida: encuesta.comida,
      limpieza: encuesta.limpieza,

      respuestaGustoComida: encuesta.respuestaGustoComida,
      respuestaDisgustoComida: encuesta.respuestaDisgustoComida,
      respuestabebida: encuesta.respuestabebida,
      respuestaPersonal: encuesta.respuestaPersonal,
      respuestaUltima: encuesta.respuestaUltima,

      time: time
    });
  }

  obtenerListaDeEspera() {
    return this.db.collection('listaDeEspera').valueChanges();
  }

  obtenerMesasDisponibles() {
    return this.db.collection('mesas', ref => ref.where('disponible', '==', true)).valueChanges();
  }

  obtenerPedidosAConfirmar() {
    return this.db.collection('pedidos', ref => ref.where('estado', '==', 'pendiente_confirmacion')).valueChanges();
  }

  asignarMesa(id: string, dni: string) {
    this.db.collection("mesas").doc(id).update({
      disponible: false,
      dniCliente: dni
    });
  }

  confirmacionCliente(pedido, mesa, cliente, total) {
    this.db.collection('pedidos').doc().set(
      {
        pedido: pedido,
        estado: "pendiente_confirmacion",
        total: total,
        mesa: mesa,
        cliente: cliente
      }
    );
  }

  despacharPedido(mesa) {//HACE FALTAR DEFINIR MESA COMO ID DE DOCUMENTO
    this.db.collection('pedidos').doc(mesa).update({
      estado: "despachado"
    })
  }


  obtenerPedidoxNroMesa(mesa) {
    return this.db.collection('pedidos').doc(mesa).valueChanges();
  }

}

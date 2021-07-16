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

  guardarEnLista(email, nombre, apellido, dni) {
    this.db.collection("listaDeEspera").doc(dni).set({
      email: email,
      nombre: nombre,
      apellido: apellido,
      dni: dni
    });
  }

  borrarDeLista(dni) {
    this.db.collection('listaDeEspera').doc(dni).delete();
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

  obtenerBebidasAPreparar(){
    return this.db.collection('pedidos', ref => ref.where('estado_bebidas', '==', 'despachado')).valueChanges();
  }

  obtenerPedidosAPreparar(){
    return this.db.collection('pedidos', ref => ref.where('estado_cocina', '==', 'despachado')).valueChanges();
  }

  obtenerPedidosAEntregar(){
    return this.db.collection('pedidos', ref => ref.where('estado_cocina', '==', 'preparandolo')).valueChanges();
  }

  obtenerBebidasAEntregar(){
    return this.db.collection('pedidos', ref => ref.where('estado_bebidas', '==', 'preparandolo')).valueChanges();
  }

  obtenerPedidos(){
    return this.db.collection('pedidos', ref => ref.where('estado', '!=', 'pendiente_confirmacion')).valueChanges();
  }

  obtenerPedido(mesa){
    return this.db.collection('pedidos', ref => ref.where('mesa', '==', mesa)).valueChanges();
  }

  asignarMesa(id : string, dni : string){
    this.db.collection("mesas").doc(id).update({
      disponible: false,
      dniCliente: dni
    });

    this.borrarDeLista(dni);
  }

  liberarMesa(id : string){
    this.db.collection("mesas").doc(id).update({
      disponible: true,
      dniCliente: ""
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

  despacharPedido(mesa){
    this.db.collection('pedidos').doc(mesa).update({
      estado: "despachado",
      estado_bebidas: "despachado",
      estado_cocina: "despachado"
    });
  }

  rechazarPedido(mesa){
    this.db.collection('pedidos').doc(mesa).update({
      estado: "cancelado",
      estado_bebidas: "cancelado",
      estado_cocina: "cancelado"
    });
  }

  prepararPedido(mesa, esCocina){
    if(esCocina){
      console.log('b2');
      this.db.collection('pedidos').doc(mesa).update({
        estado_cocina: "preparandolo",
        estado: "preparandolo"
      });
    }
    else{
      this.db.collection('pedidos').doc(mesa).update({
        estado_bebidas: "preparandolo",
        estado: "preparandolo"
      });
   }
  }



  obtenerPedidoxNroMesa(mesa) {
    return this.db.collection('pedidos').doc(mesa).valueChanges();
  }

  entregarPedido(mesa, esCocina){
    var pedido : any [] = [];
    this.obtenerPedido(mesa).subscribe(data  => {
      pedido = data;      
    });
    var intervalo = setInterval(() => {
      //console.log(pedido);
      if(pedido.length != 0){
        if(esCocina){
          this.db.collection('pedidos').doc(mesa).update({
            estado_cocina: "listo_para_servir"
          });
          if(pedido[0].estado_bebidas == "listo_para_servir"){
            this.db.collection('pedidos').doc(mesa).update({
              estado: "listo_para_servir"
            });
          }
        }
        else{
          this.db.collection('pedidos').doc(mesa).update({
            estado_bebidas: "listo_para_servir"
          });
          if(pedido[0].estado_cocina == "listo_para_servir"){
            this.db.collection('pedidos').doc(mesa).update({
              estado: "listo_para_servir"
            });
          }
        }
        clearInterval(intervalo);
      }
    }, 2000);
  }

  servirPedido(mesa){
    this.db.collection('pedidos').doc(mesa).update({
      estado: "servido",
      estado_bebidas: "servido",
      estado_cocina: "servido"
    });
  }

  actualizarToken(dniCliente, deviceToken){
    this.db.collection("users").doc(dniCliente).update({
      token: deviceToken
    });
  }

  actualizarEstadoDelPedido(estado, mesa){
    this.db.collection('pedidos').doc(mesa).update({
      estado: estado
    });
  }

  obtenerTokenMozo(){
    return this.db.collection('users', ref => ref.where('tipo', '==', "mozo")).valueChanges();
  }

  obtenerTokenAdmin(){
    return this.db.collection('users', ref => ref.where('tipo', '==', "dueño")).valueChanges();
  }

  obtenerTokenCliente(dni){
    return this.db.collection('users', ref => ref.where('dni', '==', dni)).valueChanges();
  }

  obtenerTokenCocina(){
    return this.db.collection('users', ref => ref.where('tipo', '==', "cocina")).valueChanges();
  }

  obtenerTokenBarra(){
    return this.db.collection('users', ref => ref.where('tipo', '==', "barra")).valueChanges();
  }

  borrarPedido(mesa) {
    this.db.collection('pedidos').doc(mesa).delete();
  }
  
}

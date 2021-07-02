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

  obtenerListaDeEspera(){
    return this.db.collection('listaDeEspera').valueChanges();
  }

  obtenerMesasDisponibles(){
    return this.db.collection('mesas', ref => ref.where('disponible', '==', true)).valueChanges();
  }

  obtenerPedidosAConfirmar(){
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
    return this.db.collection('pedidos', ref => ref.where('estado_bebidas', '!=', 'pendiente_confirmacion')).valueChanges();
  }

  obtenerPedido(mesa){
    return this.db.collection('pedidos', ref => ref.where('mesa', '==', mesa)).valueChanges();
  }

  asignarMesa(id : string, dni : string){
    this.db.collection("mesas").doc(id).update({
      disponible: false,
      dniCliente: dni
    });
  }

  confirmacionCliente(pedido, mesa, cliente, total){
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

  entregarPedido(mesa, esCocina){
    var pedido : any [] = [];
    this.obtenerPedido(mesa).subscribe(data  => {
      pedido = data;      
    });
    var intervalo = setInterval(() => {
      //console.log(pedido);
      if(pedido != null){
        if(esCocina){
          this.db.collection('pedidos').doc(mesa).update({
            estado_cocina: "listo_para_servir"
          });
        }
        else{
          this.db.collection('pedidos').doc(mesa).update({
            estado_bebidas: "listo_para_servir"
          });
        }
        if(pedido[0].estado_bebidas == "listo_para_servir" && pedido[0].estado_cocina == "listo_para_servir"){
          this.db.collection('pedidos').doc(mesa).update({
            estado: "listo_para_servir"
          });
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
}
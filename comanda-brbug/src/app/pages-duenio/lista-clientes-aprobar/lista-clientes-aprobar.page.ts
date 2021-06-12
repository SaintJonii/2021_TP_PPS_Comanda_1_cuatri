import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-lista-clientes-aprobar',
  templateUrl: './lista-clientes-aprobar.page.html',
  styleUrls: ['./lista-clientes-aprobar.page.scss'],
})
export class ListaClientesAprobarPage implements OnInit {

  public users : any [] = [];
  public clienteSinAutorizar : boolean = false;

  constructor(private db : StoreService, private toastController : ToastController) { }

  ngOnInit() {
    this.db.obtenerUsuariosSinAprobar().subscribe(doc => {
      this.users=doc;
      if(this.users.length != 0){
        this.clienteSinAutorizar = true;
      }
      else{
        this.clienteSinAutorizar = false;
      }
    });
  }

  aceptar(dni : string){
    this.db.aceptarCliente(dni);
    this.mostrarToast("Cliente aceptado");
  }

  rechazar(dni : string){
    this.db.rechazarCliente(dni);
    this.mostrarToast("Cliente rechazado");
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}

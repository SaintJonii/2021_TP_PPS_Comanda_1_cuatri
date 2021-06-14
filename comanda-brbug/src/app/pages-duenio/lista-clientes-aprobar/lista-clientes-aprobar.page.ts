import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EmailService } from 'src/app/services/email.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-lista-clientes-aprobar',
  templateUrl: './lista-clientes-aprobar.page.html',
  styleUrls: ['./lista-clientes-aprobar.page.scss'],
})
export class ListaClientesAprobarPage implements OnInit {

  public users : any [] = [];
  public clienteSinAutorizar : boolean = false;

  constructor(private db : StoreService, 
    private toastController : ToastController,
    private emailSv : EmailService) { }

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

  aceptar(user : any){
    this.db.aceptarCliente(user.dni);
    this.mostrarToast("Cliente aceptado");
    this.emailSv.mandarEmail(user, false);
  }

  rechazar(user : any){
    this.db.rechazarCliente(user.dni);
    this.mostrarToast("Cliente rechazado");
    this.emailSv.mandarEmail(user, true);
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}

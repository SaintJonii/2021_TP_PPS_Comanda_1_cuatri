import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
  public titulo : string = "Lista de clientes";

  constructor(private db : StoreService, 
    private toastController : ToastController,
    private emailSv : EmailService,
    private loadingController : LoadingController) { }

  ngOnInit() {
    this.db.obtenerUsuariosSinAprobar_no_order().subscribe(doc => {
      this.users=doc;
      if(this.users.length != 0){
        this.clienteSinAutorizar = true;
        this.presentLoading();
      }
      else{
        this.clienteSinAutorizar = false;
      }
    });
  }

  aceptar(user : any){
    this.db.aceptarCliente(user.dni);
    this.emailSv.mandarEmail(user, false);
    this.presentLoading();
    setTimeout(() => {
      this.mostrarToast("Cliente aceptado");
    }, 5300);
  }

  rechazar(user : any){
    this.db.rechazarCliente(user.dni);
    this.emailSv.mandarEmail(user, true);
    this.presentLoading();
    setTimeout(() => {
      this.mostrarToast("Cliente rechazado");
    }, 5300);
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
      duration: 5000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

}

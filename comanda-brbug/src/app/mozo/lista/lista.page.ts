import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { MesasModalComponent } from '../mesas-modal/mesas-modal.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  titulo = "Lista de espera";
  public users : any [] = [];
  public clientesEsperando : boolean = false;
  public spinner : boolean = true;

  constructor(private db : StoreService,
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    private toastController : ToastController) { }

  ngOnInit() {
    this.presentLoading();
    this.db.obtenerListaDeEspera().subscribe(data => {
      this.users = data;
      if(this.users.length != 0){
        this.clientesEsperando = true;
      }
      else{
        this.clientesEsperando = false;
      }
    })
  }

   async openModal(user){
    const modal = await this.modalCtrl.create({
      component: MesasModalComponent,
      componentProps: {dni: user.dni}
    });

    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.spinner = false;
    }, 2000);
  }

  rechazar(user : any){
    this.db.borrarDeLista(user.dni);
    this.presentLoading();
    setTimeout(() => {
      this.mostrarToast("Cliente removido de la lista de espera");
    }, 3000);
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { MesasModalComponent } from '../mesas-modal/mesas-modal.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  public users : any [] = [];
  public clientesEsperando : boolean = false;

  constructor(private db : StoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
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

}

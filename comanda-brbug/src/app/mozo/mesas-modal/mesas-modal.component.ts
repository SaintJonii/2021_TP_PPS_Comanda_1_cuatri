import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-mesas-modal',
  templateUrl: './mesas-modal.component.html',
  styleUrls: ['./mesas-modal.component.scss'],
})
export class MesasModalComponent implements OnInit {
  @Input() dni: string;

  public mesas : any [] = [];
  public mesasDisponibles : boolean = false;

  constructor(private modalCtrl: ModalController, private db: StoreService, private router: Router) { }

  ngOnInit() {
    this.db.obtenerMesasDisponibles().subscribe(data => {
      this.mesas = data;
      if(this.mesas.length != 0){
        this.mesasDisponibles = true;
      }
      else{
        this.mesasDisponibles = false;
      }
    })
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  seleccionarMesa(id){
    console.log(id);
    this.db.asignarMesa(id, this.dni);
    this.dismissModal();
    this.router.navigateByUrl('homeMozo');
  }

}

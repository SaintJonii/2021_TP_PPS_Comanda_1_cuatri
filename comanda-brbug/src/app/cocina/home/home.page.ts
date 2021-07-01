import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { PedidoModalComponent } from '../pedido-modal/pedido-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  listaAPreparar(){
    this.router.navigateByUrl('prepararCocina');
  }

  listaAEntregar(){
    this.router.navigateByUrl('entregasCocina');
  }
}

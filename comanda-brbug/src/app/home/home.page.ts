import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../services/encuesta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private encuestaSv : EncuestaService) {}

  ngOnInit(){}

  ionViewDidEnter(){
    this.encuestaSv.actualizarEncuestas();
  }



}

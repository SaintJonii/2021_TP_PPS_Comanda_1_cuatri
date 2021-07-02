import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  titulo = "Inicio";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listaAPreparar(){
    this.router.navigateByUrl('prepararBarra');
  }

  listaAEntregar(){
    this.router.navigateByUrl('entregasBarra');
  }
}

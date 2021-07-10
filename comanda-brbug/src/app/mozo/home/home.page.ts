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

  irLista(){
    this.router.navigateByUrl('listaMozo');
  }

  irConfirmar(){
    this.router.navigateByUrl('pedidosMozo');
  }

  irEntrega(){
    this.router.navigateByUrl('pendientesMozo');
  }

  chat() {
    this.router.navigateByUrl('chat');
  }
}

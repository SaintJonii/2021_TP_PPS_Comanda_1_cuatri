import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-duenio',
  templateUrl: './home-duenio.page.html',
  styleUrls: ['./home-duenio.page.scss'],
})
export class HomeDuenioPage implements OnInit {

  nombre : string = null;
  objetoJSON : string = null;

  constructor(private route : Router, private auth : AuthService) {
    this.objetoJSON=localStorage.getItem("usuarioActual");
    this.nombre=JSON.parse(this.objetoJSON).nombre;
  }

  ngOnInit() {
  }

  altaDuenio(){
    console.log("alta dueño / supervisor");
  }
  altaEmpleado(){
    console.log("alta empleado");
  }
  listaClientes(){
    this.route.navigateByUrl('lista-clientes-aprobar');
  }

  logout(){
    this.auth.logout();
    this.route.navigateByUrl('login');
  }

}

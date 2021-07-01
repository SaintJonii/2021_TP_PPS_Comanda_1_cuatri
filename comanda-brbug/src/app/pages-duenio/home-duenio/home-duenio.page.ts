import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-duenio',
  templateUrl: './home-duenio.page.html',
  styleUrls: ['./home-duenio.page.scss'],
})
export class HomeDuenioPage implements OnInit {

  objetoJSON : string = null;
  titulo : string = null;

  constructor(private route : Router, private auth : AuthService) {
    this.objetoJSON=localStorage.getItem("usuarioActual");
    let nombre=JSON.parse(this.objetoJSON).nombre;
    this.titulo="Bienvenido "+nombre;
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

}

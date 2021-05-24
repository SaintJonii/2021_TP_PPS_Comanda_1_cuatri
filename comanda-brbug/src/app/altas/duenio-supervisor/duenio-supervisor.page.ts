import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-duenio-supervisor',
  templateUrl: './duenio-supervisor.page.html',
  styleUrls: ['./duenio-supervisor.page.scss'],
})
export class DuenioSupervisorPage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  letrasPattern : string = "^[a-zA-Z ]*$";


  altaForm = new FormGroup({
    nombre: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    apellido: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    dni: new FormControl('',  [Validators.required,Validators.min(10000000),Validators.max(99999999)]),
    cuil: new FormControl('',  [Validators.required,Validators.min(10000000000),Validators.max(99999999999)]),
    perfil: new FormControl(''),
    email: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(3)])
  });

  constructor() { }

  ngOnInit() {
  }

  tomarFoto(){
    console.log("Foto tomada");
  }

  escanearQr(){
    console.log("Escanear Qr");
  }

  alta(altaform){
    if(altaform.status!="INVALID"){
      console.log(altaform);
    }
    else{
      console.log("Error en el formulario");
    }
  }

}

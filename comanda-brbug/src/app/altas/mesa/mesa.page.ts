import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {


  altaForm = new FormGroup({
    numeroMesa: new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),
    comensales: new FormControl('',[Validators.required,Validators.min(1),Validators.max(20)]),
    vip: new FormControl(false),
    discapacitados : new FormControl(false)
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

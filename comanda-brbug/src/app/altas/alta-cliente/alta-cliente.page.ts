import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
//import { Vibration } from '@ionic-native/vibration/ngx';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  letrasPattern : string = "^[a-zA-Z ]*$";
  numerosPattern : string = "^[0-9 ]*$";

  altaForm = new FormGroup({
    nombre: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    apellido: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    dni: new FormControl('',  [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(this.numerosPattern)]),
    correo: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(3)]),
    passwordConfirm: new FormControl('',  [Validators.required,Validators.minLength(3)])
  });

  constructor(public toastController: ToastController, 
    /*private vibration: Vibration*/
    /*private barcodeScanner: BarcodeScanner*/) { }

  ngOnInit() {
  }

  tomarFoto(){
    console.log("Foto tomada");
  }

  escanearQr(){
    console.log("Escanear Qr");
    /*this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
         console.log('Error', err);
    });*/
  }

  alta(altaform){
    if(altaform.status!="INVALID"){
      if(altaform.value.password == altaform.value.passwordConfirm){
        console.log(altaform);
      }
      else{
        this.mostrarToast("Error: Confirme correctamente la contraseña.");
        //this.vibration.vibrate(2000);
      }
    }
    else{
      this.mostrarToast("Error: Campos inválidos.");
      //this.vibration.vibrate(2000);
    }
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const scanner = BarcodeScanner;

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

  dni : string = null;
  apellido : string = null;
  nombre : string = null;

  //Variables para el uso del escaner
  result : string = null;
  scanActive : boolean = false;
  resultDNI : string [] = [];



  constructor(public toastController: ToastController, private alertController : AlertController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    scanner.prepare();
  }
  ngOnDestroy(){
    scanner.stopScan();
  }

  tomarFoto(){
    console.log("Foto tomada");
  }

  escanearQr(){
    this.startScanner();
  }

  alta(altaform){
    if(altaform.status!="INVALID"){
      if(altaform.value.password == altaform.value.passwordConfirm){
        console.log(altaform);
      }
      else{
        this.mostrarToast("Error: Confirme correctamente la contraseña.");
      }
    }
    else{
      this.mostrarToast("Error: Campos inválidos.");
    }
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  //FUNCIONES DEL ESCANER
  stopScanner(){
    scanner.stopScan();
    this.scanActive = false;
  }

  async startScanner()
  {
    
    const allowed = this.checkPermission();
    if(allowed){
      this.scanActive = true;
      const result = await scanner.startScan();
      console.log(result);
      if(result.hasContent){
        this.result = result.content;
        this.scanActive = false;
        
        this.resultDNI=this.result.split("@",6)
        this.dni=this.resultDNI[1].trim(); // DNI
        this.apellido=this.resultDNI[4]; // APELLIDO
        this.nombre=this.resultDNI[5]; // NOMBRE

      }
    }
  
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await scanner.checkPermission({ force: true });
      if (status.granted){
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Open Settings',
            handler: () => {
              scanner.openAppSettings();
              resolve(false);
            }
          }]
        });

        await alert.present();
      } else {
        resolve(false);
      }
    });
  }

}

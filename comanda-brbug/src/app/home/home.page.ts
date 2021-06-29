import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, AlertController } from '@ionic/angular';
const scanner = BarcodeScanner;
import { EncuestaService } from '../services/encuesta.service';
import { StoreService } from '../services/store.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //Variables para el uso del escaner
  result: any = [];
  scanActive: boolean = false;
  titulo= "Home";
  usuario;

  constructor(public toastController: ToastController,
              private alertController : AlertController,
              private route : Router,
              private encuestaSv : EncuestaService,
              private storeSv: StoreService ) { 
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    //Ver si tiene pedido en curso, ir directamente a la sala
  }

  //FUNCIONES DEL ESCANER
  stopScanner() {
    scanner.stopScan();
    this.scanActive = false;
  }

  async escanear() {

    const allowed = this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      const result = await scanner.startScan();
      console.log(result);
      if (result.hasContent) {
        this.result = result.content.split("@");
        this.scanActive = false;
        if(this.result[1] == "sala-espera"){
          this.route.navigateByUrl('sala');
          this.storeSv.guardarEnLista(this.usuario.email, this.usuario.nombre, this.usuario.apellido, this.usuario.dni);
        }
        else{
          this.mostrarToast("QR Inválido");
        }
      }
    }

  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await scanner.checkPermission({ force: true });
      if (status.granted) {
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

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
 
  ionViewDidEnter(){
    this.encuestaSv.actualizarEncuestas();
  }



}

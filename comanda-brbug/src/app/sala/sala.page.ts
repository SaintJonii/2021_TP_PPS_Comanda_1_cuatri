import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, AlertController } from '@ionic/angular';
const scanner = BarcodeScanner;


@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {
   //Variables para el uso del escaner
   result: any = [];
   scanActive: boolean = false;

  constructor(public toastController: ToastController, private alertController : AlertController, private route : Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.mostrarToast("El mozo asignará su mesa");
    }, 1000);
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
        //consultar por el estado de la mesa
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

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const scanner = BarcodeScanner; 

@Component({
  selector: 'app-pagar-cuenta',
  templateUrl: './pagar-cuenta.page.html',
  styleUrls: ['./pagar-cuenta.page.scss'],
})
export class PagarCuentaPage implements OnInit {

  pedidos : any = {};
  titulo : string = null;

  descuento : number = 0;
  descuentoPorcentaje : number = 0;

  propina : number = 0;
  propinaPorcentaje : any = 0;

  //Variables para el uso del escaner
  result : string [] = [];
  scanActive : boolean = false;

  images : string [] = [
    "assets/propina/malo.png",
    "assets/propina/regular.png",
    "assets/propina/bien.png",
    "assets/propina/muyBien.png",
    "assets/propina/excelente.png",
  ];

  imagenElegida : string = null;
  satifaccion : string = null;


  constructor(private db : StoreService, 
    private authSv : AuthService,
    private route : Router,
    private alertController : AlertController,
    private toastController: ToastController, ) {

    let mesa=localStorage.getItem("nro_mesa");
    this.titulo="Mesa "+mesa;
    this.db.obtenerPedidoxNroMesa(mesa).subscribe( doc => {
      console.log(doc);
      this.pedidos=doc;
    });
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    scanner.prepare();
  }
  ngOnDestroy(){
    scanner.stopScan();
  }

  ingresarPropina(){
    this.startScanner();
  }


  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  elegirPropina(propina : string){
    switch(propina){
      case "0":
      this.imagenElegida=this.images[0];
      this.satifaccion="Malo";
      break;

      case "5":
      this.imagenElegida=this.images[1];
      this.satifaccion="Regular";
      break;

      case "10":
      this.imagenElegida=this.images[2];
      this.satifaccion="Bien";
      break;

      case "15":
      this.imagenElegida=this.images[3];
      this.satifaccion="Muy bien";
      break;

      case "20":
      this.imagenElegida=this.images[4];
      this.satifaccion="Excelente";
      break;
    }
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
        this.result = result.content.split("@");
        this.scanActive = false;
        if(this.result[1] == "propina"){
          let propina = this.result[2];
          this.propinaPorcentaje=propina;
          this.propina=Number(propina)/100;
          this.elegirPropina(propina);
        }
        else{
          this.mostrarToast("QR Inválido");
        }


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

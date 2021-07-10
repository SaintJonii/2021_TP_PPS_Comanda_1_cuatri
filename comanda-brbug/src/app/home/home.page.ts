import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, AlertController } from '@ionic/angular';
const scanner = BarcodeScanner;
import { EncuestaService } from '../services/encuesta.service';
import { StoreService } from '../services/store.service'
import { PedidoService } from '../services/pedido.service'
import { LoadingController } from '@ionic/angular';
import { PushService } from '../services/push.service';

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
  style= "url('/assets/login/fondoLogin.png') 100% 100%/100% 100% no-repeat";
  usuario;

  constructor(public toastController: ToastController,
              private alertController : AlertController,
              private route : Router,
              private encuestaSv : EncuestaService,
              private storeSv: StoreService,
              private pedidoSvce: PedidoService,
              private loadingController: LoadingController,
              private pushSvce: PushService ) { 
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    this.pedidoEnCurso();
  }

  ionViewWillEnter(){
    this.pedidoEnCurso();
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
          this.notificarAlMozo();
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

  pedidoEnCurso() {
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    let aux = this.pedidoSvce.buscarPedido(this.usuario.dni).subscribe(doc => {
      let pedido: any = doc[0];
      if (pedido) {
        this.presentLoading();
        localStorage.setItem("nro_mesa", pedido.mesa);
        setTimeout(() => {
          this.route.navigateByUrl('sala');
        }, 2500);
        
      }
    });

    //aux.unsubscribe();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
      duration: 2200
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  notificarAlMozo(){
    this.storeSv.obtenerTokenMozo().subscribe(doc => {
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushSvce.sendNotification("Sala de Espera", "Nuevo cliente esperando mesa", token);
    }
    );
  }


}

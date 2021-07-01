import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, AlertController } from '@ionic/angular';
import { PedidoService } from '../services/pedido.service'
import { StoreService } from '../services/store.service'
const scanner = BarcodeScanner;


@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {
  result: any = [];
  scanActive: boolean = false;
  usuario;
  tienePedido: Boolean;
  titulo = "Sala de espera";
  nroMesa;
  mostrarBotones: Boolean;

  constructor(public toastController: ToastController,
    private alertController: AlertController,
    private route: Router,
    private pedidoSvce: PedidoService,
    private storeSv: StoreService) {

    this.tienePedido = false;
    this.mostrarBotones = false;
    this.nroMesa = "";
  }

  ngOnInit() {
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

      if (result.hasContent) {
        this.result = result.content.split("@");
        this.scanActive = false;

        if (this.result[1] == "mesa") {
          this.manejarMesa(this.result[2]);
        }
        else {
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

  pedidoEnCurso() {
    debugger;
    this.usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    this.pedidoSvce.buscarPedido(this.usuario.dni).subscribe(doc => {
      let pedido: any = doc[0];
      if (pedido) {
        this.tienePedido = true;
        this.nroMesa = pedido.mesa;
        localStorage.setItem("nro_mesa", pedido.mesa);
        this.mostrarToast("Ya tenés un pedido en curso");
      }
      else {
        this.mostrarToast("El mozo le asignará una mesa");
      }
    });
  }

  manejarMesa(mesaEscaneada) {
   
    this.pedidoSvce.buscarMesa(mesaEscaneada).subscribe(doc =>{
      let mesa: any = doc;
      debugger;
      if(mesa.disponible && !this.tienePedido){
        this.storeSv.asignarMesa(mesa.id, this.usuario.dni);
        localStorage.setItem("nro_mesa", mesa.id);
        this.route.navigateByUrl('menu');
      }
      else if (this.tienePedido && mesa.id == this.nroMesa ) {
        this.mostrarBotones = true;
      }
      else if (this.tienePedido && mesa.id != this.nroMesa) {
        this.mostrarToast("Tu mesa asignada es la número "+this.nroMesa+" !!");
      }
      else if(!mesa.disponible){
        this.mostrarToast("La mesa no está disponible");
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

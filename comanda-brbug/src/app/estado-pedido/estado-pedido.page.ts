import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.page.html',
  styleUrls: ['./estado-pedido.page.scss'],
})
export class EstadoPedidoPage implements OnInit {

  //EJEMPLO
  /*pedido : any = 
    {
      cliente: "44444444",
      estado: "pendiente_confirmacion",
      mesa: "3",
      pedido: [{
        producto: {
          desc: "Milanesa o suprema a la napolitana. Con papa fritas, ensalada o pure de papa como guarnición.",
          id: 2,
          imagen: "https://firebasestorage.googleapis.com/v0/b/la-estancia-76490.appspot.com/o/productos%2F2%2Fnapolitana.jpg?alt=media&token=6e1b0232-c390-4f42-bf85-355ab536d4ba",
          nombre: "Milanesa Napolitana",
          precio: 600
        },
        unidades: 1
      },
      {
        producto: {
          desc: "Hecha con 120gr de carne vacuna. Con queso chedar ...",
          id: 1,
          imagen: "https://firebasestorage.googleapis.com/v0/b/la-estancia-76490.appspot.com/o/productos%2F1%2Fhamburguesa-casera.jpg?alt=media&token=00b8b7b3-9abb-4f40-a70c-9a5329abb1f2",
          nombre: "Hamburguesa XL",
          precio: 500
        },
        unidades: 1
      },
      {
        producto: {
          desc: "Ñoquis de papa con salsa a elección: Bolognesa, parisienne o rosa.",
          id: 3,
          imagen: "https://firebasestorage.googleapis.com/v0/b/la-estancia-76490.appspot.com/o/productos%2F3%2F%C3%B1oquis.jpg?alt=media&token=a26a1b7b-0c06-48fb-ba29-bb95ed5fd5fc",
          nombre: "Ñoquis con salsa",
          precio: 550
        },
        unidades: 2
      }],
      total: 2200
    }
  ;*/

  pedido : any = {};
  titulo : string = null;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private db : StoreService,
    private loadingController : LoadingController) {
    let mesa=localStorage.getItem("nro_mesa");
    this.titulo="Mesa"+mesa;
    this.db.obtenerPedidoxNroMesa(mesa).subscribe( doc => {
      console.log(doc);
      this.pedido=doc;
    });

  }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor',
      duration: 2700
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }


}

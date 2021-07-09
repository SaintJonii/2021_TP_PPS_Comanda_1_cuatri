import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EncuestaService } from '../services/encuesta.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  velocidad : number = 1;
  starVelocidad1 : boolean = true;
  starVelocidad2 : boolean = false;
  starVelocidad3 : boolean = false;
  starVelocidad4 : boolean = false;
  starVelocidad5 : boolean = false;

  atencion : number = 1;
  starAtencion1 : boolean = true;
  starAtencion2 : boolean = false;
  starAtencion3 : boolean = false;
  starAtencion4 : boolean = false;
  starAtencion5 : boolean = false;

  comida : number = 1;
  starComida1 : boolean = true;
  starComida2 : boolean = false;
  starComida3 : boolean = false;
  starComida4 : boolean = false;
  starComida5 : boolean = false;

  limpieza : number = 1;
  starlimpieza1 : boolean = true;
  starlimpieza2 : boolean = false;
  starlimpieza3 : boolean = false;
  starlimpieza4 : boolean = false;
  starlimpieza5 : boolean = false;

  respuestaGustoComida : string = null;
  respuestaDisgustoComida : string = null;
  respuestabebida : string = null;
  respuestaPersonal : string = null;
  respuestaUltima : string = null;

  encuesta : any = null;

  titulo : string = "Encuesta";


  constructor(private db : StoreService,
    private encuestaSv : EncuestaService,
    private auth : AuthService,
    private route : Router,
    private loadingController : LoadingController) { 
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.route.navigateByUrl('login');
  }

  enviarEncuesta(){
    this.encuesta = {
      velocidad: this.velocidad,
      atencion: this.atencion,
      comida: this.comida,
      limpieza: this.limpieza,

      respuestaGustoComida: this.respuestaGustoComida,
      respuestaDisgustoComida: this.respuestaDisgustoComida,
      respuestabebida: this.respuestabebida,
      respuestaPersonal: this.respuestaPersonal,
      respuestaUltima: this.respuestaUltima
    }

    this.db.addEncuesta(this.encuesta);
    this.encuestaSv.actualizarEncuestas();
    this.presentLoading();
    setTimeout(() => {
      this.route.navigateByUrl('sala');
    }, 3000);
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

  rateVelocidad(value : number){
    if(value==1){
      this.starVelocidad1= true;
      this.starVelocidad2= false;
      this.starVelocidad3= false;
      this.starVelocidad4= false;
      this.starVelocidad5= false;
      this.velocidad=1;
    }
    else if(value==2){
      this.starVelocidad1= true;
      this.starVelocidad2= true;
      this.starVelocidad3= false;
      this.starVelocidad4= false;
      this.starVelocidad5= false;
      this.velocidad=2;
    }
    else if(value==3){
      this.starVelocidad1= true;
      this.starVelocidad2= true;
      this.starVelocidad3= true;
      this.starVelocidad4= false;
      this.starVelocidad5= false;
      this.velocidad=3;
    }
    else if(value==4){
      this.starVelocidad1= true;
      this.starVelocidad2= true;
      this.starVelocidad3= true;
      this.starVelocidad4= true;
      this.starVelocidad5= false;
      this.velocidad=4;
    }
    else if(value==5){
      this.starVelocidad1= true;
      this.starVelocidad2= true;
      this.starVelocidad3= true;
      this.starVelocidad4= true;
      this.starVelocidad5= true;
      this.velocidad=5;
    }
    
  }
  rateAtencion(value : number){
    if(value==1){
      this.starAtencion1= true;
      this.starAtencion2= false;
      this.starAtencion3= false;
      this.starAtencion4= false;
      this.starAtencion5= false;
      this.atencion=1;
    }
    else if(value==2){
      this.starAtencion1= true;
      this.starAtencion2= true;
      this.starAtencion3= false;
      this.starAtencion4= false;
      this.starAtencion5= false;
      this.atencion=2;
    }
    else if(value==3){
      this.starAtencion1= true;
      this.starAtencion2= true;
      this.starAtencion3= true;
      this.starAtencion4= false;
      this.starAtencion5= false;
      this.atencion=3;
    }
    else if(value==4){
      this.starAtencion1= true;
      this.starAtencion2= true;
      this.starAtencion3= true;
      this.starAtencion4= true;
      this.starAtencion5= false;
      this.atencion=4;
    }
    else if(value==5){
      this.starAtencion1= true;
      this.starAtencion2= true;
      this.starAtencion3= true;
      this.starAtencion4= true;
      this.starAtencion5= true;
      this.atencion=5;
    }
  }
  rateComida(value : number){
    if(value==1){
      this.starComida1=true;
      this.starComida2=false;
      this.starComida3=false;
      this.starComida4=false;
      this.starComida5=false;
      this.comida = 1;
    }
    else if(value==2){
      this.starComida1=true;
      this.starComida2=true;
      this.starComida3=false;
      this.starComida4=false;
      this.starComida5=false;
      this.comida = 2;
    }
    else if(value==3){
      this.starComida1=true;
      this.starComida2=true;
      this.starComida3=true;
      this.starComida4=false;
      this.starComida5=false;
      this.comida = 3;
    }
    else if(value==4){
      this.starComida1=true;
      this.starComida2=true;
      this.starComida3=true;
      this.starComida4=true;
      this.starComida5=false;
      this.comida = 4;
    }
    else if(value==5){
      this.starComida1=true;
      this.starComida2=true;
      this.starComida3=true;
      this.starComida4=true;
      this.starComida5=true;
      this.comida = 5;
    }
  }
  rateLimpieza(value : number){
    if(value==1){
      this.starlimpieza1=true;
      this.starlimpieza2=false;
      this.starlimpieza3=false;
      this.starlimpieza4=false;
      this.starlimpieza5=false;
      this.limpieza = 1;
    }
    else if(value==2){
      this.starlimpieza1=true;
      this.starlimpieza2=true;
      this.starlimpieza3=false;
      this.starlimpieza4=false;
      this.starlimpieza5=false;
      this.limpieza = 2;
    }
    else if(value==3){
      this.starlimpieza1=true;
      this.starlimpieza2=true;
      this.starlimpieza3=true;
      this.starlimpieza4=false;
      this.starlimpieza5=false;
      this.limpieza = 3;
    }
    else if(value==4){
      this.starlimpieza1=true;
      this.starlimpieza2=true;
      this.starlimpieza3=true;
      this.starlimpieza4=true;
      this.starlimpieza5=false;
      this.limpieza = 4;
    }
    else if(value==5){
      this.starlimpieza1=true;
      this.starlimpieza2=true;
      this.starlimpieza3=true;
      this.starlimpieza4=true;
      this.starlimpieza5=true;
      this.limpieza = 5;
    }
  }

}

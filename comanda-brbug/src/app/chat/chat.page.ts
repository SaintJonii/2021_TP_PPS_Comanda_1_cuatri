import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';
import { PushService } from '../services/push.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  titulo : string = "Consulta";

  messages : any []= [];

  currentUser= this.chatSv.usuarioActual;
  newMsg : string = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(private chatSv : ChatService,
    private loadingController : LoadingController,
    private storeSvce : StoreService,
    private pushService : PushService) { }

  ngOnInit() {
    this.presentLoading();
    this.chatSv.ObtenerMensajes().subscribe(doc => {
      this.messages=doc;
    });
    setTimeout(()=>{
      this.content.scrollToBottom(0);
    },1500);
  }


  mandarMensaje(){
    //Envia un push a todos los mozos
    localStorage.setItem("msjChat", this.newMsg);
    if(this.currentUser!="Mozo"){
      this.enviarNotificacionMozos();
    }

    this.chatSv.GuardarMensaje(this.newMsg,this.currentUser);
    
    this.newMsg = '';

    setTimeout(()=>{
      this.content.scrollToBottom(0);
    },1500);

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

  enviarNotificacionMozos(){
    this.storeSvce.obtenerTokenMozo().subscribe(doc => {

      let strConsulta = "Consulta "+this.chatSv.usuarioActual;
      let msj = localStorage.getItem("msjChat");
      for(let i=0;i<doc.length;i++)
      {
        let docAux: any = doc[i];
        let token = JSON.parse(docAux.token).value;
        this.pushService.sendNotification(strConsulta, msj, token);
      }
      
      /*let msj = localStorage.getItem("msjChat");
      let strConsulta = "Consulta "+this.chatSv.usuarioActual;
      let docAux: any = doc[0];
      let token = JSON.parse(docAux.token).value;
      this.pushService.sendNotification(strConsulta, msj, token);*/
    }
    );
  }


}

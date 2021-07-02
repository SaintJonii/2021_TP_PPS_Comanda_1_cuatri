import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  titulo : string = "Consulta";

  messages : any []= [];

  currentUser= this.chatSv.usuarioActual;
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(private chatSv : ChatService,
    private loadingController : LoadingController) { }

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


}

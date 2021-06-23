import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages : any []= [];

  currentUser=this.chatSv.usuarioActual;
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(private chatSv : ChatService) { }

  ngOnInit() {
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

  salir(){
    console.log("salir")
  }

}

import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotificationSchema, Token, ActionPerformed, PushNotifications, Channel } from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PushService {

  msj: Channel;
  device_token;
  constructor(private router: Router, private http: HttpClient) { }
 
  public initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }
 
  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        console.log('My token: ' + JSON.stringify(token));
        this.device_token = JSON.stringify(token);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }

  sendNotification(title, mensaje){
    debugger;
    let res = this.http.post('https://fcm.googleapis.com/fcm/send', {
                notification: {
                  title: title,
                  body: mensaje,
                  sound: true,
                  data: {
                    'google.delivered_priority': 'high',
                    'google.original_priority': 'high',
                    collapse_key: 'io.ionic.starter',
                  },
                  id: '1:355095454257:android:46cf037c9d28fd4d306b10',
                },
                to: 'e4h_zHjbTXyhfxOMmrc7BF:APA91bHWliFe5F9vvVdFw4YLLBAW_1xYKacgG8K_6BydvyqgjpLiY11mI17N_qdbrXBNR4y1L-KQhbz-dWrqsBqcQCqEYMWGXxMr0LSMemG21g1nBY1guaFXlOKbELc-8KN_a2SQMZHs',
              });
   
  }


}

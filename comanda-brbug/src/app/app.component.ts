import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, public pushService: PushService) {
    this.initializeApp();
  }

  initializeApp(){
    this.router.navigateByUrl('splash');
    this.pushService.initPush();
  }
}

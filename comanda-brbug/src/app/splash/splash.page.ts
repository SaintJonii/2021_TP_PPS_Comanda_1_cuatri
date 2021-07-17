import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) {
   
   }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 5000);
  }

  ionViewDidEnter(){
    SplashScreen.hide();
}

}

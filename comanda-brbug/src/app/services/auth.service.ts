import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(async resp => {

        await this.auth.currentUser.then(async token => {
          alert("Usuario Logueado");
  
        });
      }).catch(function (e) {
        console.log(e);
        alert("Credenciales Incorrectas");
      });
  }


}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db : StoreService,
    private router : Router) { }


  loginUser(email: string, password: string) {

    return this.auth.signInWithEmailAndPassword(email, password)
      .then(async resp => {

        await this.auth.currentUser.then(async token => {
          let user = email;
          localStorage.setItem("usuarioActual", user);
          this.router.navigateByUrl('home');
  
        });
      }).catch(function (e) {
        console.log(e);
        return 1;
      });
  }

  //Cuando se crea un cliente el estado de aprobado sera false
  //Cuando se crea cualquier tipo de usuario el estado de aprobado sera true
  createUser(form, tipo : string, dataUrl : string, aprobado : boolean)
  {
    return new Promise((resolve,rejected)=>{
      this.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(async user=>{
        //Almacenar foto del usuario
        const ref = this.storage.ref(`images/users/${form.value.dni}`);
        await ref.putString(dataUrl, 'data_url', {
        contentType: 'image/jpeg',
        });

        ref.getDownloadURL().subscribe(url=>{
            //Almacenar Usuario
            this.db.addUser(form, url, tipo, aprobado);   
        });
        console.log("Usuario creado!!");
        resolve(user);
      })
      .catch(error => rejected(error));
    });
  }

  


}

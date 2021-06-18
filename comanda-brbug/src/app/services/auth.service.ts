import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listaUsuarios : any [] = [];

  usuarioActual : any = null;

  constructor(private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db : StoreService,
    private router : Router) {
      this.db.obtenerUsuarios().subscribe( users => {
        this.listaUsuarios=users;
      });
    }


  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(async resp => {

        await this.listaUsuarios.forEach(user => {
          if(user.email == email){
            this.usuarioActual=user;
          }
        });
  
        if(this.usuarioActual.rechazado){
          return 2;
        }else{
          if(!this.usuarioActual.aprobado){
            return 3;
          }
          else{
            await this.auth.currentUser.then(async token => {
              let userData = {
                'email': this.usuarioActual.email,
                'nombre': this.usuarioActual.nombre,
                'tipo': this.usuarioActual.tipo,
                'apellido': this.usuarioActual.apellido,
                'dni': this.usuarioActual.dni,
                'foto': this.usuarioActual.foto
              };
              localStorage.setItem("usuarioActual", JSON.stringify(userData));
              if(this.usuarioActual.tipo == "cliente"){
                this.router.navigateByUrl('home');
              }else if (this.usuarioActual.tipo == "mozo"){
                this.router.navigateByUrl('home');  
              }else if (this.usuarioActual.tipo == "dueño"){
                this.router.navigateByUrl('home-duenio');
              }

            });
          }
        }

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
        this.router.navigateByUrl("login");
        resolve(user);
      })
      .catch(error => rejected(error));
    });
  }

  logout(){
    this.auth.signOut(); 
  }

  


}

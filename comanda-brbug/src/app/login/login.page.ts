import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';
import { PushService } from '../services/push.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(6)])
  });

  alert=false;
  alertMsj="";

  public errorMessages = {
    correo: [
     { type: 'required', message: 'El correo es obligatorio' },
     { type: 'pattern', message: 'Ingrese un correo válido' },],

     password: [
     { type: 'required', message: 'La contraseña es obligatoria' },
     { type: 'minlength', message: 'La contraseña debe tener por lo mínimo 6 caracteres' } ],
  }

  email : string = null;
  contrasenia : string = null;


  constructor(private route : Router,
    private auth : AuthService,
    private alertController : AlertController,
    private db : StoreService,
    public pushService: PushService,
    public toastController: ToastController, ){
  }

  //Variable para el anonimo
  nombre : string = "";
  apellido : string = "";

  ngOnInit() {
    this.pushService.initPush();
  }

  get correo(){
    return this.loginForm.get('correo')
  }
  get password() {
    return this.loginForm.get('password')
  }

  async login(loginForm){
    if(loginForm.status!="INVALID"){

      let validation:any = await this.auth.loginUser(loginForm.value.correo, loginForm.value.password);
      if(validation == 1){

        /*this.alert=true;
        this.alertMsj="Error: Credenciales incorrectas";
        setTimeout(() => {
          this.alert=false;
        }, 3000);*/
        this.mostrarToast("Error: Credenciales incorrectas");
      }else if(validation == 2){
        /*this.alert=true;
        this.alertMsj="Error: Cuenta rechazada";
        setTimeout(() => {
          this.alert=false;
        }, 3000);*/
        this.mostrarToast("Error: Cuenta rechazada");
      }else if(validation == 3){
        /*this.alert=true;
        this.alertMsj="Error: Cuenta sin aprobar";
        setTimeout(() => {
          this.alert=false;
        }, 3000);*/
        this.mostrarToast("Error: Cuenta sin aprobar");
      }
    }
    else{
      /*this.alert=true;
      this.alertMsj="Error: Campos inválidos.";
      setTimeout(() => {
        this.alert=false;
      }, 3000);*/
      this.mostrarToast("Error: Campos inválidos.");
    }
  }

  registrarse(){
    this.route.navigateByUrl('alta-cliente');
  }

  loginMozo(){
    this.email="mozo@mozo.com";
    this.contrasenia="123456";
  }
  loginDuenio(){
    this.email="admin@admin.com";
    this.contrasenia="admin123";
  }
  loginCocina(){
    this.email="cocina@cocina.com";
    this.contrasenia="123456";
  }
  loginBarra(){
    this.email="barra@barra.com";
    this.contrasenia="123456";
  }

  //Funciones para el anonimo
  modoAnonimo(){
    const el = document.getElementById('modal');
    el.style.setProperty('opacity', '1');
    el.style.setProperty('visibility', 'visible');
  }

  cerrarModalAnonimo(){
    const el = document.getElementById('modal');
    el.style.setProperty('opacity', '0');
    el.style.setProperty('visibility', 'hidden');
  }

  ingresarAnonimo(){
    if(this.nombre != "" && this.apellido != ""){
      this.cerrarModalAnonimo();

      this.db.modificandoNombreApellidoAnonimo(this.nombre, this.apellido);
      this.auth.loginUser("anonimo@anonimo.com", "anonimo123");
    }
    else{
      this.cerrarModalAnonimo();

      /*this.alert=true;
      this.alertMsj="Error: Campos inválidos";
      setTimeout(() => {
        this.alert=false;
      }, 3000);*/
      this.mostrarToast("Error: Campos inválidos");
    }
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}

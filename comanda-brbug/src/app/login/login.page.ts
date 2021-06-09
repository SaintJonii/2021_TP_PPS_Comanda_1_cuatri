import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


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

  constructor(private route : Router,
    private auth : AuthService) { }

  ngOnInit() {
  }

  get correo() {
    return this.loginForm.get('correo')
  }
  get password() {
    return this.loginForm.get('password')
  }

  async login(loginForm){
    if(loginForm.status!="INVALID"){

      let validation:any = await this.auth.loginUser(loginForm.value.correo, loginForm.value.password);
      if(validation == 1){

        this.alert=true;
        this.alertMsj="Error: Credenciales incorrectas";
        setTimeout(() => {
          this.alert=false;
        }, 3000);

      }
    }
    else{
      this.alert=true;
      this.alertMsj="Error: Campos inválidos.";
      setTimeout(() => {
        this.alert=false;
      }, 3000);
    }
  }

  registrarse(){
    this.route.navigateByUrl('alta-cliente');
  }


}

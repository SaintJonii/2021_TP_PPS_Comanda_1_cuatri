import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(3)])
  });

  alert=false;
  alertMsj="";

  constructor(private route : Router) { }

  ngOnInit() {
  }

  login(loginForm){
    if(loginForm.status!="INVALID"){
      console.log(loginForm);
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

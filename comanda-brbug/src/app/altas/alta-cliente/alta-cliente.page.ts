import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';


const scanner = BarcodeScanner; 

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  letrasPattern : string = "^[a-zA-Z ]*$";
  numerosPattern : string = "^[0-9 ]*$";

  altaForm = new FormGroup({
    nombre: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    apellido: new FormControl('',  [Validators.required,Validators.minLength(3),Validators.pattern(this.letrasPattern)]),
    dni: new FormControl('',  [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(this.numerosPattern)]),
    email: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(6)]),
    passwordConfirm: new FormControl('',  [Validators.required,Validators.minLength(6)])
  });

  foto : string = "assets/usuario.png";
  dataUrl : string = null;

  dniStr : string = null;
  apellidoStr : string = null;
  nombreStr : string = null;

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener por lo mínimo 3 caracteres' },
      { type: 'pattern', message: 'Ingrese un nombre válido' },],
    
    apellido: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'minlength', message: 'El apellido debe tener por lo mínimo 3 caracteres' },
      { type: 'pattern', message: 'Ingrese un apellido válido' },],

    dni: [
      { type: 'required', message: 'El dni es obligatorio' },
      { type: 'maxlength', message: 'El dni debe tener 8 caracteres' },
      { type: 'minlength', message: 'El dni debe tener 8 caracteres' },
      { type: 'pattern', message: 'Ingrese un dni válido' },],

    email: [
     { type: 'required', message: 'El correo es obligatorio' },
     { type: 'pattern', message: 'Ingrese un correo válido' },],

    password: [
     { type: 'required', message: 'La contraseña es obligatoria' },
     { type: 'minlength', message: 'La contraseña debe tener por lo mínimo 6 caracteres' } ],

    passwordConfirm: [
     { type: 'required', message: 'La confirmacion es obligatoria' },
     { type: 'minlength', message: 'La confirmacion debe tener por lo mínimo 6 caracteres' } ],

  }

  //Variables para el uso del escaner
  result : string = null;
  scanActive : boolean = false;
  resultDNI : string [] = [];



  constructor(public toastController: ToastController, 
    private alertController : AlertController,
    private auth : AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    scanner.prepare();
  }
  ngOnDestroy(){
    scanner.stopScan();
  }

  get nombre() {
    return this.altaForm.get('nombre')
  }
  get apellido() {
    return this.altaForm.get('apellido')
  }
  get dni() {
    return this.altaForm.get('dni')
  }
  get email() {
    return this.altaForm.get('email')
  }
  get password() {
    return this.altaForm.get('password')
  }
  get passwordConfirm(){
    return this.altaForm.get('passwordConfirm')
  }

  async tomarFoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,   //Comente esta linea para testear el api de la camara en el navegador
    });
    this.foto=Capacitor.convertFileSrc(capturedPhoto.dataUrl);
    this.dataUrl=capturedPhoto.dataUrl;
    
  }

  escanearQr(){
    this.startScanner();
  }

  alta(altaform){
    if(altaform.status!="INVALID"){
      if(altaform.value.password == altaform.value.passwordConfirm){
        if(this.dataUrl!=null){
          this.auth.createUser(altaform, "cliente", this.dataUrl, false);
        }
        else{
          this.mostrarToast("Error: Foto invalida");
        }
      }
      else{
        this.mostrarToast("Error: Confirme correctamente la contraseña.");
      }
    }
    else{
      this.mostrarToast("Error: Campos inválidos.");
    }
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  //FUNCIONES DEL ESCANER
  stopScanner(){
    scanner.stopScan();
    this.scanActive = false;
  }

  async startScanner()
  {
    
    const allowed = this.checkPermission();
    if(allowed){
      this.scanActive = true;
      const result = await scanner.startScan();
      console.log(result);
      if(result.hasContent){
        this.result = result.content;
        this.scanActive = false;
        
        this.resultDNI=this.result.split("@",6)
        this.dniStr=this.resultDNI[1].trim(); // DNI
        this.apellidoStr=this.resultDNI[4]; // APELLIDO
        this.nombreStr=this.resultDNI[5]; // NOMBRE

      }
    }
  
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await scanner.checkPermission({ force: true });
      if (status.granted){
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Open Settings',
            handler: () => {
              scanner.openAppSettings();
              resolve(false);
            }
          }]
        });

        await alert.present();
      } else {
        resolve(false);
      }
    });
  }

}

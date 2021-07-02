import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private db : AngularFirestore) {
  }

  actualizarEncuestas(){
    this.ObtenerEncuestas().subscribe( doc => {
      localStorage.setItem("encuestas", JSON.stringify(doc));
    });
  }

  ObtenerEncuestas(){
    return this.db.collection('encuestas').valueChanges();
  }

}

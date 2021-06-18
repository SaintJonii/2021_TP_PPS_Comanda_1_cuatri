import { Injectable, NgZone  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private zone: NgZone) { }

  mandarEmail(user : any, rechazo : boolean) {
		let body = {
			mail: user.email,
      asunto: "Estado del registro",
      rechazo: rechazo,
      destinatario: user.nombre
		};
		let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}
		let subA = this.zone.run(() => this.http.post("https://bodegon-la-estancia.herokuapp.com/api/sendEmail", body, headers).subscribe(sub => {
			console.log(sub);
		}));
		setTimeout(() => {
			subA.unsubscribe();
		}, 5000)
	}

}

import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export class Interception {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `key=AAAAUq1WojE:APA91bFqyROC_m9azJRD1G922n4E1yXHcvr9P-XyXD-t9bQc_TJtXrtSxIsNMiKwZlIC0XT5I2-FdKC0VCQcv81myXWyEXsnkHZWJX47L1poYczVwVZ5EQzVwfZ_iJRUBgCOL8v_wQjA`,
        },
      });
      return next.handle(req);
    }
  }
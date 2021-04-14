import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Interceptor implements HttpInterceptor {
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = req.headers
        .set('Content-Type','application/json')
        let clone = req.clone({headers})
        
        return next.handle(clone);
    }
  }
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService,
    private toast: ToastrService) { }
  intercept(req,next){
    
    if(this.auth.getToken()){
      const newToken = this.auth.getToken();
      req = req.clone({
        setHeaders:{
          Authorization:`Bearer ${newToken.token}`
        }
      });
    }
    
   
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.auth.logoutUser();
          location.reload(true);
      }
      
      const error = err.error.message || err.statusText;
      this.toast.error(error);
      return throwError(error);
    })
);
  }
}

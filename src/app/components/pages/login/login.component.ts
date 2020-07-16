import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastrService
  ) {
    if(this.auth.authenticateUser()){
       this.router.navigate["/"];
    }
   }

  ngOnInit(): void {
  }

  onSubmit = (f:NgForm) =>{
    const {email,password} = f.form.value;
    if(email == '' || password == ''){
      return this.toast.error("Fields cannot be empty!")
    }
    this.auth.loginUser(f.form.value).subscribe((user)=>{
      localStorage.setItem("token",JSON.stringify(user));
      f.resetForm();
      this.router.navigate([""]);
      this.toast.success("Login successful!");
    },(error)=>{
      console.log(error);
      this.toast.error(error.error.error);
    })
  }

}

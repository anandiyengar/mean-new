import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit = (f:NgForm) =>{
    const {password,cpassword} = f.form.value;
    if(password !== cpassword){
       return this.toast.error("Password does not match with confirm password!");
    } 

    if(password.length < 6 ){
      return this.toast.error("Password should be atleast 6 characters long!");
    }

    this.auth.registerUser(f.form.value).subscribe((user)=>{
      return this.toast.success(`Account of ${user.name} has been created.`)
    },(error)=>{
      f.resetForm();
      return this.toast.error(error.error.error)

    }
    )

  }

}

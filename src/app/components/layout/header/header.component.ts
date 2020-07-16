import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Input()
export class HeaderComponent implements OnInit {
  email=null;
  currentUser;
  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router,
  ) {
    if(auth.getLoggedInName){
      auth.getLoggedInName.subscribe((name) =>
      {
      this.changeName(name);
     }
      );
    }
    if(auth.getToken()){
      this.currentUser=auth.getToken().user.email;
    }
      
    
   
   }
   private changeName(name): void {
    this.currentUser = name;
    console.log("jjjj",this.currentUser)
 }

  ngOnInit(): void {
    
  }
 


  async logoutHandle(){
    try{
      await this.auth.logoutUser();
        this.email = null;
        this.router.navigateByUrl("/login");
        this.toast.success("You have been logged out!")
    }
    catch(err){
      console.log(err);
    }
  }

}

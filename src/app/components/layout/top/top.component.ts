import { Component, OnInit } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  currentUser = null;
  faCaretRight = faCaretRight;
  constructor(
    private auth: AuthService
  ) {
    if(auth.getLoggedInName){
      auth.getLoggedInName.subscribe((name) =>
      {
      this.changeName(name);
      console.log("name",name);
     }
      );
    }
    if(auth.getToken()){
      this.currentUser=auth.getToken().user.email;
      console.log("emm",this.currentUser);
    }
      
    
   
   }
   private changeName(name): void {
    this.currentUser = name;
    console.log("jjjj",this.currentUser)
 }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
allPosts = [];
userId = null;
count = 0;
picUrl = `${environment.api_url}/post/photo/`;
faEdit = faEdit
faTrash = faTrash

  constructor(
    private post: PostService,
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    if(this.auth.getToken()){
      this.userId = this.auth.getToken().user._id;
      this.post.getMyPosts(this.userId).subscribe((posts)=>{
         this.allPosts = posts;
         this.count = this.count+1;
      })
    }
   }

  ngOnInit(): void {
    
  }

  delPost = (postIdNew) => {
    this.post.delPost(this.userId,postIdNew).subscribe((pp)=>{
     this.toast.success("Post has been deleted!")
     this.router.navigateByUrl("/")
    })
  }


}

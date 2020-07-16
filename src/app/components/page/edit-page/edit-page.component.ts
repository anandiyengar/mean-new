import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  fileToUpload= null;
  title = null;
  description = null;
  userId = null;
  postId = null;

  constructor(
    private post: PostService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.userId = this.auth.getToken().user._id;
      this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post.getSinglePost(this.postId).subscribe((po)=>{
      this.title = po.title;
      this.description = po.description;
    })
  }
  
  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
 }


  onSubmit = (f:NgForm) => {
    let data = f.form.value;
    const fd = new FormData;
    if(this.fileToUpload != null){
      fd.append("picture",this.fileToUpload,this.fileToUpload.name);
    }
     if(data.title != ''){
      fd.append("title",data.title);
     }
     if(data.description != ''){
      fd.append("title",data.description);
     }
      
      this.post.updatePost(fd,this.userId,this.postId).subscribe((pp)=>{
         this.toast.success("Post has been updated!");
         this.router.navigateByUrl("/myposts")
      },(error)=>{
        return this.toast.error("Something went wrong!")
      })
  }

}

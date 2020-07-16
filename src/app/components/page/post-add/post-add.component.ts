import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  user = null;
  fileToUpload= null;

  constructor(
    private auth: AuthService,
    private post: PostService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getToken();
  }

  handleFileInput(event) {
   this.fileToUpload = event.target.files[0];
}


  onSubmit = (f:NgForm) => {
    const token = this.user.token;
    const userId = this.user.user?._id;
    let data = f.form.value;
    const fd = new FormData;
    fd.append("picture",this.fileToUpload,this.fileToUpload.name);
    fd.append("title",data.title);
    fd.append("description",data.description);
    this.post.createPost(fd,token,userId).subscribe((tt)=>{
      return this.toast.success("Post has been added.")
    },(error)=>{
      return this.toast.error("SOmething went wrong!")
    })

  }

}

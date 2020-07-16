import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(
    private router: Router,
    private post: PostService
  ) { }
  allPosts = [];
  count=0;
  picUrl = `${environment.api_url}/post/photo/`;
  ngOnInit(): void {
    this.post.getAllPost().subscribe((posts)=>{
      // this.allPosts = posts;
      posts.map((po)=>{
        this.post.getAuthor(po.user).pipe(
          map((res)=>{
            this.allPosts = posts;
            this.count = this.count+1;
          })
        ).subscribe()
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  public id: string;
  picUrl = environment.api_url;
  postContent = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.postService.getSinglePost(this.id).subscribe((pp)=>{
      this.postContent = pp;
      console.log("post",pp)
    })
  }

}

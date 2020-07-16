import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private allposts = `${environment.api_url}/posts`
  private user = `${environment.api_url}/user`
  private singlePostUrl = `${environment.api_url}/post`
  private createUrl = `${environment.api_url}/post/create`


  constructor(
    private http: HttpClient
  ) { }

  getAllPost = () => {
    return this.http.get<any>(this.allposts);
  }

  getAuthor = (userId) => {
    const newUser = `${this.user}/${userId}`
    return this.http.get<any>(newUser);
  }

  getSinglePost = (id) => {
    const newSinglePost = `${this.singlePostUrl}/${id}`
    return this.http.get<any>(newSinglePost);
  }

  createPost = (data,token,userId) =>{
    const mainUrl = `${this.createUrl}/${userId}`
    return this.http.post<any>(mainUrl,data);
  }

  updatePost = (data,userId,postId) =>{
    const mainUrl = `${environment.api_url}/post/update/${postId}/${userId}`
    return this.http.put<any>(mainUrl,data);
  }

  delPost = (userId,postId) => {
    const mainUrl = `${environment.api_url}/post/delete/${postId}/${userId}`
    return this.http.delete<any>(mainUrl);
  }

  getMyPosts = (id) => {
    return this.http.get<any>(`${environment.api_url}/post/my/${id}`)
  }

 
}

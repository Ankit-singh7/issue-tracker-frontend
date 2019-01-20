import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { Cookie } from 'ng2-cookies';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public baseurl = "http://api.toker.ml"
  public socket;


  constructor(public http: HttpClient) { 
    this.socket = io(this.baseurl)
  }


  //Authentication Section:

  public verifyUser = () =>{
    return Observable.create((observer)=>{
      this.socket.on("verify-user",(socketData)=>{
        observer.next(socketData)
      })
    })
  }

  public setUser = (token) => {
    this.socket.emit("set-user", token)
  }


  public onlineUserList = () => {

    return Observable.create((observer) => {

      this.socket.on("onlineUsers", (userList) => {

        observer.next(userList);

      }); // end Socket

    }); // end Observable

  } // end onlineUserList




  //list create socket service for multi user
  public createIssue = (userName) => {
    this.socket.emit("createIssue",userName)
  }

  public issueAddedResponse = ()=>{
    return Observable.create((observer)=>{
      this.socket.on("createIssue-res",(data)=>{
        observer.next(data);
        console.log(data);
      })
    })
  }


  //issue title update(edit) respose

  public updateIssue =(userName)=>{
    this.socket.emit("updateIssue",userName)
  }

  public issueUpdatedResponse = () => {
    return Observable.create((observer)=>{
      this.socket.on("updateIssue-res",(data)=>{
        observer.next(data);
      })
    })
  }


  //comments on issue response

  public addComment =(userName)=>{
    this.socket.emit("addComment",userName)
  }

  public commentAddedResponse = () => {
    return Observable.create((observer)=>{
      this.socket.on("addComment-res",(data)=>{
        observer.next(data);
      })
    })
  }


  

  public disconnectedSocket = () => {

    this.socket.emit("disconnect","");//end Socket

  }//end disconnectedSocket
  public exitSocket = () =>{

    this.socket.disconnect();

  }// end exit socket





  /**
   * Issue watch functionality
   */

   //Add As Watcher:

  public addAsWatcher=(data)=>{
    this.socket.emit("watch",data);
  }

  public responseAlreadyWatcher=()=>{
    return Observable.create((observer)=>{
      this.socket.on("alreadyWatcher",(data)=>{
        observer.next(data);
      })
    })
  }

  public save_watch=()=>{
    return Observable.create((observer)=>{
      this.socket.on("savewatch",(data)=>{
        observer.next(data);
      })
    })
  }







}
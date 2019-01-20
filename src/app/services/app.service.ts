import { Injectable } from '@angular/core';

//for using cookies
import { Cookie } from 'ng2-cookies/ng2-cookies';

//Importing the required files for http services.
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';





@Injectable({
  providedIn: 'root'
})
export class AppService {


  private url = 'http://api.toker.ml/api/v1';



  constructor(
    public http: HttpClient
  ) { }


  public getUserInfoFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  

  public LoginFunction  (data): Observable<any> {
    
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
      
    return this.http.post(`${this.url}/users/login`, params);
  } // end of signinFunction function.



  //Method to get country list
  public getCountryList=()=>{
    let response=this.http.get('../assets/countries.json');
    return response;
  }//end
  //method to get country code
  public getCountryCode=()=>{
    let response=this.http.get('../assets/country-code-list.json');
    return response;
  }//end

  public signupFunction  (data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('country',data.country)

    return this.http.post(`${this.url}/users/signup`, params);

  } // end of signupFunction function.


   //Method to verify email
   public verifyEmail = (data): Observable<any> => {
    return this.http.get(`${this.url}/users/${data}/verifyUser`);
  }
  //end method

  public resetPassword = (data): Observable<any> =>{

    const params = new HttpParams()
      .set('email', data.email)

    return this.http.post(this.url+'/users/recovery-password', params);


  }//end resetPassword


  public updatePassword = (data): Observable<any> =>{

    const params= new HttpParams()
    .set('recoveryPassword',data.recoveryPassword)
    .set('password',data.newPassword)

    return this.http.post(`${this.url}/users/update-password`,params);
  }

    //Get All Users:
    public getAllpeople = (): Observable<any> => {
      return this.http.get(`${this.url}/users/all?authToken=${Cookie.get('authtoken')}`)
    }




    //Method to get All issues
    public getIssues = (): Observable<any> => {
      return this.http.get(`${this.url}/issues/allIssues?authToken=${Cookie.get('authtoken')}`);
    }
    //end method


    //Creating a new Issue:
    public createIssue = (data): Observable<any> => {
      const params = new HttpParams()
        .set("issueTitle", data.issueTitle)
        .set("reporterId", data.reporterId)
        .set("reporterName",data.reporterName)
        .set("status",data.status)
        .set("description",data.description)
        .set("attachments",data.attachments)
        .set("assignee",data.assignee)

        return this.http.post(`${this.url}/issues/registerIssue?authToken=${Cookie.get('authtoken')}`, params)
    }

    //Method to get single issue details
    public getIssue = (issueId): Observable<any> => {
      return this.http.get(`${this.url}/issues/${issueId}/getIssue?authToken=${Cookie.get('authtoken')}`);
    }
    //end method

    //Method to edit issue title
    public editIssue = (issueDetails,issueId) : Observable<any> => {
     
      return this.http.put(`${this.url}/issues/${issueId}/editIssue?authToken=${Cookie.get('authtoken')}`,issueDetails);

    }

    public deleteIssue = (issueDetails,issueId) : Observable<any> => {
     
      return this.http.put(`${this.url}/issues/${issueId}/deleteIssue?authToken=${Cookie.get('authtoken')}`,issueDetails);

    }



    //add a new comment to issue:
    public addComment = (data) : Observable<any> => {
      const params = new HttpParams()
        .set("issueId", data.issueId)
        .set("userId", data.userId)
        .set("userName",data.userName)
        .set("comment",data.comment)
        return this.http.post(`${this.url}/comments/addComment?authToken=${Cookie.get('authtoken')}`, params)
    }


    //Method to get all comments on Issue
    public getAllCommentOnIssue = (issueId): Observable<any> => {
      return this.http.get(`${this.url}/comments/${issueId}/getCommentsOnIssue?authToken=${Cookie.get('authtoken')}`);
    }
    //end method





    public logout(): Observable<any> {
      const params = new HttpParams()
      .set('authtoken', Cookie.get('authtoken'));

      return this.http.post(`${this.url}/users/logout?authToken=${Cookie.get('authtoken')}`,params);
  
    } // end logout function
  


}

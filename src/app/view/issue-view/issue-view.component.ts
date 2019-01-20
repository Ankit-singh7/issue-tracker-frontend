import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';


import { Cookie } from 'ng2-cookies';

import { SocketService } from '../socket.service'


@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css']
})
export class IssueViewComponent implements OnInit , OnDestroy{

  
  public AllCommentsOfIssue: any;
  public comment: any;
  public AllIssues: any;
  public description: any;
  public assignee: any;
  public status: any;
  public users: any;
  public users1:any=[];
  public users2:any=[];
 

  public issueDetails:any=[];

  public userId:any;
  public fullName:any;
  public token:any;

  public issueId:any;
  public issueTitle:any;

  constructor(public socketService: SocketService,
              public appService: AppService, 
              public _route: ActivatedRoute,
              public  router: Router,
             public toastr: ToastrService) { }

    ngOnInit() {


      this.userId = Cookie.get("receiverId");
      this.fullName = Cookie.get("receiverName");
      this.token = Cookie.get('authToken')

      let issueId = this._route.snapshot.paramMap.get('issueId');

      this.appService.getIssue(issueId).subscribe(
        (apiResponse: any) => {

          this.issueDetails = apiResponse.data
          this.issueId=this.issueDetails.issueId;
        }, (err) => {
          console.log(err);
        }

      )
      
      this.checkStatus();
      this.issueUpdatedResponse();
      this.newIssueAddedResponse()

      this.getAllIssues()
      this.getAllCommentsOnIssue();
      this.commentAddedResponse();

      this.responseAlreadyWatcher();
      this.save_watch()

      this.getIssue()

    }


    //To check whether the user is loggedIn or not
    public checkStatus: any = () => {
      if (Cookie.get('authtoken') === undefined || 
          Cookie.get('authtoken') === '' || 
          Cookie.get('authtoken') === null) {
            this.router.navigate(['/']);
             return false;
      } else {
        return true;
      }
    } // end checkStatus





    ngOnDestroy() {
      this.socketService.exitSocket()
    }


  //for getting all users
  public getAllUsers = () => {
    this.appService.getAllpeople().subscribe((apiResponse: any) => {
      this.users1 = apiResponse.data;
      //  this.requests = apiResponse.data.requests;
      this.users2=[];

      for(let user of this.users1){
        if(`${user.firstName} ${user.lastName}`!=this.fullName){
          this.users2.push(user)
        }
      }

    })
  }



  
  //user confirmation

  public verifyUserConfirmation = () => {
    this.socketService.verifyUser().subscribe((response) => {
      this.socketService.setUser(this.token);
      console.log("User is verified")
    })
  }


  
  public getOnlineUserList: any = () => {

    this.socketService.onlineUserList()
      .subscribe((userListfromdb) => {

        this.users = '';

        for (let x in userListfromdb) {

          let temp = { 'userId': x, 'fullName': userListfromdb[x] };

          this.users=temp;
        }

      });//end subscribe

  }//end getOnlineUserList



  //Getting All Items:
  public getAllIssues = () => {
    this.appService.getIssues().subscribe((apiResponse: any) => {

      this.AllIssues = apiResponse.data
    }, (err) => {
      console.log(err);
    })
  }





  public getIssue=()=>{

    let issueId = this._route.snapshot.paramMap.get('issueId');

    this.appService.getIssue(issueId).subscribe(
      (apiResponse: any) => {

        this.issueDetails = apiResponse.data
        this.issueId=this.issueDetails.issueId;
      }, (err) => {
        console.log(err);
      }

    )
  }



  //Getting All Items:
  public getAllCommentsOnIssue = () => {
    let issueId = this._route.snapshot.paramMap.get('issueId');

    //console.log(this.issueId)
    this.appService.getAllCommentOnIssue(issueId).subscribe((apiResponse: any) => {

      this.AllCommentsOfIssue=apiResponse.data
    }, (err) => {
      console.log(err);
    })
  }




  //Update a issue details for all users:
  public setIssueDetails = (issueId, issueTitle,status,description,assignee) => {
    this.getAllUsers()
    this.issueId = issueId
    this.issueTitle = issueTitle
    this.status=status
    this.description=description
    this.assignee=assignee
  }


  public updateIssue = () => {
    let data = {
      issueTitle: this.issueTitle,
      issueId: this.issueId,
      status:this.status,
      description:this.description,
      assignee:this.assignee
    }
    this.appService.editIssue(data,this.token).subscribe((apiResponse: any) => {
      this.getIssue();
      this.socketService.updateIssue(this.fullName)
    }, (err) => {
      this.toastr.error(`Unable to update Issue details`)
    })

  }

  public issueUpdatedResponse = () => {
    this.socketService.issueUpdatedResponse().subscribe((response) => {
      this.toastr.success(response)
      this.getIssue();
    })
  }


  //listening event for add issue  
  public newIssueAddedResponse = () => {
    this.socketService.issueAddedResponse().subscribe((response) => {
      this.toastr.success(response);
    })
  }


  public deleteIssue():any{

    let data = {
      issueTitle: this.issueTitle,
      issueId: this.issueId,
      status:this.status,
      description:this.description,
      assignee:this.assignee
    }

    this.appService.deleteIssue(data,this.issueId).subscribe(
      data=>
      {
        this.toastr.success("Issue deleted succesfully");
        setTimeout(()=>{
          this.router.navigate(['/dashboard']);
        },1000)
      },
      error=>
      {
        this.toastr.error("some error occured");
      }
    )
  }//end of deleteThisBlog





  //for creating OR registering new issue
  public addNewComment = () => {
    if (!this.comment) {
      this.toastr.warning(`Please enter comment`);
    }
    else {
      let values = {
        issueId: this.issueId,
        userId: this.userId,
        userName: this.fullName,
        comment:this.comment

      }

      this.appService.addComment(values).subscribe((apiResponse: any) => {

        if (apiResponse.status == 200) {
          this.toastr.success(apiResponse.message);
          this.comment = ""
          this.getAllCommentsOnIssue()
          this.socketService.addComment(this.fullName)
        }
      }, (error) => {
        console.log(`Error Occured`)
      })
    }
  }



  public commentAddedResponse = () => {
    this.socketService.commentAddedResponse().subscribe((response) => {
      this.toastr.success(response)
      this.getAllCommentsOnIssue();
    })
  }




  //watch related functionalities

    public addAsWatcher = (issueId) => {
      let data = {
        issueId:issueId,
        watcherId: this.userId,
        watcherName: this.fullName
      }

      this.socketService.addAsWatcher(data)
      this.getIssue();
      this.getAllIssues();
    }
  
    public responseAlreadyWatcher = () => {
      this.socketService.responseAlreadyWatcher().subscribe((response) => {
        this.toastr.error(response)
      })
    }
  
    public save_watch = () => {
      this.socketService.save_watch().subscribe((response) => {
        this.toastr.success(response);
        this.getAllUsers();
        this.getIssue();
      })
    }



}
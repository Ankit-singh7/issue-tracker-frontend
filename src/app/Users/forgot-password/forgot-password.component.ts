import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email:string;

  constructor(
    public appService: AppService,
    public _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
  }

  

  public forgotPasswordFunction(): any {

    if (!this.email) {
      this.toastr.warning("Email is required", "Warning!");
    }
   
    else {
      let data = {
        email: this.email
      }

      //console.log(data)  
      this.appService.resetPassword(data).subscribe((apiResponse) => {

          if (apiResponse.status == 200) {

           
             this.toastr.success("Password reset instructions is sent to your email","Success!");
             setTimeout(()=>{
              this.router.navigate(['/reset-password']);
            },1000)

           
          }
          else {
            this.toastr.error(apiResponse.message, "Error!");
          }
        },
          (error) => {
            if(error.status == 404){
              this.toastr.error("Reset Password Failed", "Email Not Found!");
            }
            else{
              this.toastr.error("Some Error Occurred", "Error!");
             
  
            }
              
          });//end calling resetPassword
    }
  }//end forgotPasswordFunction

}
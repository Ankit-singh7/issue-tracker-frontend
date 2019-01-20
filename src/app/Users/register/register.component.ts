import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import { SortCountriesPipe } from '../sort-countries.pipe';

//for spinner loading
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstName:any;
  public lastName:any
  public email: any;
  public password: any;
  public mobileNumber: number;
  public confirmPassword:any;
  public countryName: any ="";
  public countryList:any;
  public finalCountryList:any=[];
  public codeList:any=[];
  public code:any;



  constructor(
    public appService:AppService,
    public router:Router,
    private toastr: ToastrService,
    public sortCountries : SortCountriesPipe,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
      
    this.appService.getCountryList().subscribe(
      Response=>{
         this.countryList=Response;
         for (var prop in this.countryList) {
          this.finalCountryList.push({
            'key': prop,
            'value': this.countryList[prop]
        });

         }
        this.finalCountryList=this.sortCountries.transform(this.finalCountryList);
       
      }
    )

   

  }

  

  public goToLogin: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn




  public signupFunction(): any {

    if(!this.firstName){

      this.toastr.warning('Enter your first name');
    }

    else if(!this.lastName){

      this.toastr.warning('Enter your last name');
    }

    else if(!this.email){

      this.toastr.warning('Enter your email');
    }

    else if(!this.password){

      this.toastr.warning('Enter the password');
    }
    else if(!this.confirmPassword){

      this.toastr.warning('Enter the password');
    }
    else if(this.password!=this.confirmPassword){

      this.toastr.warning("password doesn't match");
    }
    else if(!this.countryName){

      this.toastr.warning('countryName is required');
    }
    else if(!this. mobileNumber){

      this.toastr.warning('mobileNumber is required');
    }

    else {
      let data={
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password,
        mobileNumber: `+${this.code}-${this.mobileNumber}`,
        country: this.countryName
      }

      console.log(data);

      this.appService.signupFunction(data).subscribe(
        (apiResponse) => {


          console.log(apiResponse);

          if(apiResponse.status === 200){

            this.spinnerService.hide();

            this.toastr.success('Signup successful');

            setTimeout(()=>{
              this.goToLogin();

            },2000);
          }

          else {
            this.toastr.error(apiResponse.message);

          }


        },(err)=>{

          this.toastr.error('some error occured');


        });
        
        
      
      
     


      }//end condition
    } //end signupFunction

    public onChange=()=>{  
      this.appService.getCountryCode().subscribe(
        Response=>{
          this.codeList=Response;
         
          this.code=this.codeList[this.countryName];
    
        }
      )
    }//end

  }





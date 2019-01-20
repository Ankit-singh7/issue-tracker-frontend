import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//HttpClientModule is to be imported in latest version of angular
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NgxPaginationModule} from 'ngx-pagination';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';



//import this for using forms
import {FormsModule,ReactiveFormsModule} from '@angular/forms';



import {HttpModule} from '@angular/http';

//router module used for setting up the application level route
import {RouterModule,Routes} from '@angular/router';

//import this module for using animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//import this module for using toastr
import { ToastrModule } from 'ngx-toastr';


import { AppService } from './app.service';
import { RegisterComponent } from './register/register.component';
import { FilterPipe } from './filter.pipe';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { AllIssueComponent } from './all-issue/all-issue.component';


//for loading spinner
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {NgxEditorModule} from 'ngx-editor';
import { SortByPipe } from './sort-by.pipe';
import { SortCountriesPipe } from './sort-countries.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SocketService } from './socket.service';
import { RouteGuardService } from './route-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IssueViewComponent,
    NotfoundComponent,
    RegisterComponent,
    FilterPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SortByPipe,
    SortCountriesPipe,
    CreateIssueComponent,
    EditIssueComponent,
    AllIssueComponent,
   
    
  ],

 
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxEditorModule,
    FilterPipeModule,
    HttpModule,
    Ng4LoadingSpinnerModule,
  
    ToastrModule.forRoot(),

    //routerModule forRoot method is use to declare the possible routes in the application
      RouterModule.forRoot([
       
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent,canActivate:[RouteGuardService]},
      {path:'goback/:userId',component:DashboardComponent,canActivate:[RouteGuardService]},
      {path:'createIssue',component: CreateIssueComponent,canActivate:[RouteGuardService]},
      {path:'editIssue/:issueId',component: EditIssueComponent,canActivate:[RouteGuardService]},
      {path:'register',component:RegisterComponent},
      {path:'issueDetails/:issueId',component:IssueViewComponent, canActivate:[RouteGuardService]},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'all-issues',component:AllIssueComponent, canActivate:[RouteGuardService]},
      {path:'reset-password',component:ResetPasswordComponent},
      {path:'**',component: NotfoundComponent}

    ])




  

    
  ],

 
  providers: [AppService,SocketService,SortCountriesPipe,RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

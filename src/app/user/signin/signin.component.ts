import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email: any;
  public password: any;
  signuploader: boolean;

  constructor(public service:ServiceService,public route:Router,public toastr: ToastrService) { }

  ngOnInit() {
  
  }
  public signin=()=>{
   
    if(!this.email){
      this.toastr.error('please provide mail')
    }
    else if(!this.password){
      this.toastr.error('please provide password')
    }
    else {
      this.signuploader=false;
      let data={
        email:this.email,
        password:this.password
      }
      this.service.signin(data).subscribe(
        data=>{
          console.log(data);
          if(data.error==true){
            this.signuploader=true;
            this.toastr.error(data.message)
          }
          else {
            this.signuploader=true;
            this.toastr.success(data.message);
           this.route.navigate(['/home',data.data.userDetails.userId])
           Cookie.set('userId',data.data.userDetails.userId);
           Cookie.set('firstName',data.data.userDetails.firstName);
           Cookie.set('lastName',data.data.userDetails.lastName);
           Cookie.set('authToken',data.data.authToken);
          }
        },
        err=>{
          this.signuploader=true;
         this.toastr.error('some error occured')
        }
      )
    }
  
    }
  
}

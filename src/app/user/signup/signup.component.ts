import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email: any;
  public password: any;
  public firstName: any;
  public lastName: any;
  public status: any;
  signuploader: boolean;

  constructor(public service:ServiceService,public route:Router,public toastr: ToastrService) { }

  ngOnInit() {
  }
  
  public signup=()=>{
    this.signuploader=false;
    let data={
      email:this.email,
      password:this.password,
      firstName:this.firstName,
      lastName:this.lastName,
      status:this.status
    }
   this.service.signup(data).subscribe(
     data=>{
      this.signuploader=true;
      this.toastr.success(data.message);
     },
     err=>{
      this.signuploader=true;
       this.toastr.error('some error occured');
     }
   )
  }

}

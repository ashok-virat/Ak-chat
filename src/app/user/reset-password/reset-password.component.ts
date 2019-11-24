import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from 'src/app/socket-service.service';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  sign: boolean;
  resetcode: any;
  password: any;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { }

  ngOnInit() {
  }
   
  public sendcode=()=>{
    if(!this.email){
      this.toastr.warning('Enter email')
    }
    else {
      this.sign=false;
      let data={
        email:this.email
      }
      this.service.resetcode(data).subscribe(
        data=>{
          this.sign=true;
          this.toastr.success(data.message);
        },
        err=>{
          this.sign=true;
        }
      )
    }
  
  }


  public resetpassword=()=>{
    if(!this.resetcode){
    this.toastr.warning('Enter Resetcode')
    }
    else if(!this.password){
      this.toastr.warning('Enter password')
    }
    else {
    this.sign=false;
    let data={
      resetcode:this.resetcode,
      password:this.password
    }
    this.service.resetpassword(data).subscribe(
      data=>{
        this.sign=true;
    this.toastr.success(data.message);
    setTimeout(() => {
       this.route.navigate(['/signin']);
    }, 1000);
      },
      err=>{
        this.sign=true;
      }
    )
  }
}
}

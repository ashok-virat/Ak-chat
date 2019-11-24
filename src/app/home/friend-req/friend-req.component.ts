import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketServiceService } from 'src/app/socket-service.service';

@Component({
  selector: 'app-friend-req',
  templateUrl: './friend-req.component.html',
  styleUrls: ['./friend-req.component.css']
})
export class FriendReqComponent implements OnInit {
  userId: string;
  friendreq: any;
  reqcount: any;
  authToken: string;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) {
    this.userId=Cookie.get('userId');
    this.authToken=Cookie.get('authToken');
    this.getfriendreq();
    
   }

  ngOnInit() {
  }
   
  public getfriendreq=()=>{
    this.service.getfriendreq(this.userId,this.authToken).subscribe(
      data=>{
        this.friendreq=data.data;
        this.reqcount=this.friendreq.length;
      },
      err=>{
        this.toastr.error('some error occured');
        
      }
    )
  }

  //accept req code start
  public acceptrequest=(friendreqId)=>{
    let option={
      friendreqId:friendreqId,
      authToken:this.authToken
    }
       this.service.acceptrequest(option).subscribe(
         data=>{
         this.toastr.success(data.message);
            this.getfriendreq();
         },
         err=>{
           this.toastr.error('some error occured')
         }
       ) 
  }
   //accept friend req code end


   //delete friend req code start
   public deleterequest=(friendreqId)=>{
    let options={
      friendreqId:friendreqId,
      authToken:this.authToken
    }
    this.service.deletefrnfreq(options).subscribe(
      data=>{
        this.toastr.success(data.message);
        this.getfriendreq();
        
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
   //delete friend req code end

}

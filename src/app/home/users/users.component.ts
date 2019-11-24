import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from 'src/app/socket-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userId: string;
  userName: string;
  userfirstletter: string;
  status: string;
  users: any;
  firstName: string;
  lastName: string;
  public p: Number = 1;
  public count: Number = 15;
  authToken: string;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { }

  ngOnInit() {
    this.userId=Cookie.get('userId');
    this.firstName=Cookie.get('firstName');
    this.lastName=Cookie.get('lastName');
    this.authToken=Cookie.get('authToken');

    this.getusers();
  }


  public getusers=()=>{
    this.service.getusers(this.authToken).subscribe(
      data=>{
        console.log(data);
        this.users=data.data;
      }
    )
  }

 //send friendrequest code start
 public sendrequest=(receiverId)=>{
  let options={
    senderId:this.userId,
    receiverId:receiverId,
    firstName:this.firstName,
    lastName:this.lastName,
    authToken:this.authToken
  }

  this.service.sendrequest(options).subscribe(
    data=>{
      if(data.error===true){
        this.toastr.error(data.message)
      }
      else {
        this.socketService.sendrequest(options);
      this.toastr.success(data.message);
     
      }
    },
    err=>{
    alert('some error occured')
    }
  )
}
 //send friendrequest code end
 

 public receivemessage=()=>{
  this.socketService.receivemessage(this.userId).subscribe(
    data=>{
      console.log(data)
      this.toastr.success(`${data.senderName} send a message`)
   
    }
  )
}
 //logout code start
public logout=()=>{
  this.socketService.exitsocket();
  this.socketService.disconnectedSocket();
  Cookie.delete('userId');
  Cookie.delete('firstName');
  Cookie.delete('lastName');
  this.toastr.success('logout successfully');
  setTimeout(() => {
    this.route.navigate(['/signin']);
  },1000);
}
//logout code end

}

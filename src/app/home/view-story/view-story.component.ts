import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketServiceService } from 'src/app/socket-service.service';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.css']
})
export class ViewStoryComponent implements OnInit {
  comment: any;
  firstName: string;
  lastName: string;
  comments: any;
  viewnext: boolean=false;
  commentlength: any;
  authToken: string;
  newdata(newdata: any) {
    throw new Error("Method not implemented.");
  }
  userId: string;
  storyId: string;
  public p: Number = 1;
  public count: Number = 10;
  stories: any;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { }

  ngOnInit() {
    this.userId=Cookie.get('userId');
    this.firstName=Cookie.get('firstName');
    this.lastName=Cookie.get('lastName');
    this.authToken=Cookie.get('authToken');
    this.storyId=this._router.snapshot.paramMap.get('storyId');
    this.getsinglepost();
    this.receivemessage();
  }

public getsinglepost=()=>{
  let data={
    storyId:this.storyId,
    authToken:this.authToken
  }
  this.service.getsinglepost(data).subscribe(
    data=>{
     
      this.stories=data.data;

    },
    err=>{
      this.toastr.error('some error occured');
    }
  )
}

//add comment code start
public addcomment=()=>{
  if(!this.comment) {
    this.toastr.warning('please provide some value')
  }
  else {
    let data={
      storyId:this.storyId,
      comment:this.comment,
      senderId:this.userId,
      senderfirstName:this.firstName,
      senderlastName:this.lastName,
      authToken:this.authToken
    }
    this.service.addcomment(data).subscribe(
      data=>{
        this.comment='';
        this.toastr.success(data.message);
      }
    )
   
  }
  
}
//add comment code end


//get comment code start
public getcomment=()=>{
  
  let data={
    storyId:this.storyId,
    authToken:this.authToken
  }
  this.service.getcomments(data).subscribe(
     data=>{
      this.viewnext=true;
       this.comments=data.data.reverse();
       this.commentlength=this.comments.length;
      
     }
  )
}

//get comment code end


//add like code start
public addlike=(storyId)=>{
  let data={
    storyId:storyId,
    authToken:this.authToken
  }
  this.service.addlikes(data).subscribe(
     data=>{
    this.getsinglepost();
       this.toastr.success(data.message);
     }
  )
 }
//addlike code end

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
  Cookie.delete('authToken');
  this.toastr.success('logout successfully');
  setTimeout(() => {
    this.route.navigate(['/signin']);
  },1000);
}
//logout code end

   
}

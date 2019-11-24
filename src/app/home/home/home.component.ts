import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from 'src/app/socket-service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var require: any
let sortOn=require('sort-on')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public userId: string;
 public userName: any;
 public userfirstletter: any;
 public status: any;
  datas: any;
  friendsCount: any;
  stories: any;
  receiverId: any;
  public postList=[];
  public p: Number = 1;
  public count: Number = 10;
  list: any;
  comment: any;
  viewnext: boolean;
  comments: any;
  commentlength: any;
  likes: any;
  postListlength: any;
  peopleList: any;
  chating: boolean;
  friendreq: any;
  reqcount: any;
  authToken: string;
  newlikes: any;
  
  


  
  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { }

  ngOnInit() {
    this.userId=this._router.snapshot.paramMap.get('userId');
    this.authToken=Cookie.get('authToken');
    this.getsingleuser();
    this.getfriends();
    this.verifyUser();
    this.receivemessage();
    this.getfriendreq();
    this.getrequest();
  }

  

 //verify user code start
 public verifyUser=()=>{
  this.socketService.verifyUser().subscribe(
    data=>{
      this.socketService.setUser(this.userId);
    },
    err=>{
      this.toastr.error('some error occured')
    }
  )
}
//verify user code end


public receivemessage=()=>{
  this.socketService.receivemessage(this.userId).subscribe(
    data=>{
    
      this.toastr.success(`${data.senderName} send a message`)
   
    }
  )
}

  
  public getsingleuser=()=>{
    let data={
      userId:this.userId,
      authToken:this.authToken
    }
  this.service.getsingleuser(data).subscribe(
    data=>{
      this.userName=`${data.data[0].firstName} ${data.data[0].lastName}`;
      this.userfirstletter=`${data.data[0].firstName[0]}`;
      this.status=`${data.data[0].status}`;
    },
    err=>{
      alert('some error occured')
    }
  )
  }

  
   //get friends code start
  public getfriends=()=>{
  
    this.service.getfriends(this.userId,this.authToken).subscribe(
      data=>{
        this.datas=data.data;
  
        for(let list of this.datas){
         
          this.receiverId=list.receiverId;
          this.getstories(this.receiverId);
          
        }
        this.friendsCount=this.datas.length;
      }
    )
  }
  //get friends code end

   //get stories code start
 public getstories=(receiverId)=>{
  let data={
    userId:receiverId,
    authToken:this.authToken
  }
  this.service.getstories(data).subscribe(
    data=>{
      
      for(let post of data.data) {
        
        this.postList.push(post);
      }
     this.list=sortOn(this.postList,['-createdOn']);
    
     this.postListlength=false;
    },
    err=>{
      
    }
  )
}
//get stories code end




//get comment code start
public getcomment=(storyId)=>{
  let data={
    storyId:storyId,
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
 public addlike=(storyId,likes)=>{
  let data={
    storyId:storyId,
    authToken:this.authToken
  }
  this.service.addlikes(data).subscribe(
     data=>{
       console.log(likes)
        this.newlikes=likes+1;
        console.log(this.newlikes)
       this.toastr.success(data.message);
     }
  )
 }
//addlike code end


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


//receive request code start
  public getrequest=()=>{
    this.socketService.receiverequest(this.userId).subscribe(
        data=>{
          console.log(data);
          this.toastr.success(`${data.firstName} ${data.lastName} send a friend request`)
        }
    )
  }
//receiver request code end

}

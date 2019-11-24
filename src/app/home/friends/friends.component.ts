import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketServiceService } from 'src/app/socket-service.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  userId: string;
  datas: any;
  friendsCount: any;
  public p: Number = 1;
  public count: Number = 10;
  stories: any;
  newdata: any;
  storylength: any;
  comments: any;
  commentlength: any;
  frienduserId: any;
  authToken: string;

  
  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { 
    this.userId=Cookie.get('userId');
    this.authToken=Cookie.get('authToken');
    this.getfriends();
    
   
  }

  ngOnInit() {
  }

  //get friends code start
  public getfriends=()=>{
    this.service.getfriends(this.userId,this.authToken).subscribe(
      data=>{
        this.datas=data.data;
        console.log(data)
        this.friendsCount=this.datas.length;
      }
    )
  }
  //get friends code end


  //unfrined code start
  public unfriend=(friendId)=>{
   console.log(friendId)
     let options={
       friendId:friendId,
       authToken:this.authToken
     }
     this.service.unfriend(options).subscribe(
       data=>{
         this.toastr.success(data.message)
         this.getfriends();
        
       },
       err=>{
         this.toastr.error('some error occured')
       }
     )
   }
  //unfriend code end


   //get stories code start
 public getstories=(userId)=>{
   this.frienduserId=userId;
   console.log(this.frienduserId)
  let data={
    userId:userId,
    authToken:this.authToken
  }
  this.service.getstories(data).subscribe(
    data=>{
     
      this.stories=data.data;
      console.log(this.stories)
       this.newdata=this.stories.reverse();
       console.log(this.newdata)
       this.storylength=this.newdata.length;
    },
    err=>{
      this.toastr.error('some error occured');
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
 
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from 'src/app/socket-service.service';

@Component({
  selector: 'app-post-story',
  templateUrl: './post-story.component.html',
  styleUrls: ['./post-story.component.css']
})
export class PostStoryComponent implements OnInit {
   public userId: string;
  userName: string;
  userfirstletter: string;
  status: string;
  text: any;
  file: any;
  imagePreview: string;
  imageTitle: any;
  stories: any;
  public postImage=[];
  public p: Number = 1;
  public count: Number = 5;
  newdata: any;
  comments: any;
  commentlength: any;
  authToken: string;
  signuploader: boolean;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { }

  ngOnInit() {
    this.userId=Cookie.get('userId');
    this.authToken=Cookie.get('authToken');
    this.getsingleuser();
    this.getstories();
    this.receivemessage();
  }
  public getsingleuser=()=>{
    let data={
      userId:this.userId
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


  
  //image selection code start
public imageselect(event){
  this.file=event.target.files[0];
  this.postimage();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result.toString();
}
reader.readAsDataURL(this.file)
}
 //image selection code end


 //post image code start
 
 public postimage=()=>{

   if(!this.imageTitle) {
     alert('please provide imageTitle')
   }
   else {
    this.signuploader=false;
   let data={
     userId:this.userId,
     type:'image',
     image:this.file,
     name:this.file.name,
     imageTitle:this.imageTitle
   }
   this.service.postImage(data).subscribe(
     data=>{
      this.signuploader=true;
       this.toastr.success(data.message);
       this.getstories();
       this.imageTitle='';
     },err=>{
      this.signuploader=true;
       this.toastr.error('File Too Large');
     }
   )
   }
 }
 //post image code end


 //get stories code start
 public getstories=()=>{
   let data={
     userId:this.userId,
     authToken:this.authToken
   }
   this.service.getstories(data).subscribe(
     data=>{
      
       this.stories=data.data;
     
        this.newdata=this.stories.reverse();
    
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



public receivemessage=()=>{
  this.socketService.receivemessage(this.userId).subscribe(
    data=>{
      console.log(data)
      this.toastr.success(`${data.senderName} send a message`)
   
    }
  )
}



//add like code start
public addlike=(storyId)=>{
  let data={
    storyId:storyId,
    authToken:this.authToken
  }
  this.service.addlikes(data).subscribe(
     data=>{
      
       this.toastr.success(data.message)
       this.getstories();
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

//delete post code start
 public delete=(storyId)=>{
  let data={
    storyId:storyId,
    authToken:this.authToken
  }
  this.service.deletepost(data).subscribe(
    data=>{
      this.toastr.success(data.message);
      this.getstories();
    }
  )
}
//delete post code end

}

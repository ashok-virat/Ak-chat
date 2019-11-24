import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketServiceService } from 'src/app/socket-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { interval } from 'rxjs';
declare var require: any
let sortOn=require('sort-on')

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe',{read:ElementRef,static:false}) 
  
  public scrollMe: ElementRef;

  public scrollToChatTop:boolean= false;
  userId: string;
  receiverId: string;
  userName: string;
  userfirstletter: string;
  status: string;
  firstName: string;
  lastName: string;
  message: any;
  chtamessages: any;
  newmessage: void;
  chtamessageslength: any;
  messageList: any;
  mymessages: any;
  othermessages: any;
  public messageLists=[];
  public peopleList=[];
  list: any;
  finallist: any;
  chating: any;
  updateSubscription: any;
  tempmessage: any;
  chaterId: any;
  public finaltry=[];
  newmessages: any;
  authToken: string;

  constructor(public socketService:SocketServiceService,public service:ServiceService,public route:Router,public _router:ActivatedRoute,public toastr: ToastrService) { 
 
   
    this.userId=Cookie.get('userId');
    this.authToken=Cookie.get('authToken');
   
    this.receiverId=this._router.snapshot.paramMap.get('receiverId');
    this.firstName=Cookie.get('firstName');
    this.lastName=Cookie.get('lastName');
  
    this.getsingleuser();
    this.receivemessage();
    this.getmessage();
    this.receivedmessges();
    this.receivemymessages();
  }

  ngOnInit() {

     this.verifyUser();
     this.getonlineUsers();

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


//get online users code start
public getonlineUsers=()=>{
 
this.socketService.onlineUserList().subscribe(
  data=>{
    
    for (let x in data) {

      let temp = { 'userId': x, 'name': data[x] };

      this.peopleList.push(temp);          
       console.log(this.peopleList)
    }
 
  for(let online of this.peopleList){
     if(online.userId==this.receiverId) {
        this.chating=true
     }
     else if(online.userId!=this.receiverId) {
       this.chating=false;
     }
  }
  
  },
  err=>{
    this.toastr.error('some error occured')
  }
)
}
//get online users code end


  public getsingleuser=()=>{
    let data={
      userId:this.receiverId,
      authToken:this.authToken
    }
  this.service.getsingleuser(data).subscribe(
    data=>{
     
      this.userName=`${data.data[0].firstName} ${data.data[0].lastName}`;
      this.userfirstletter=`${data.data[0].firstName[0]}`;
      this.status=`${data.data[0].status}`;
      this.verifyUser();
      this.getonlineUsers();
    },
    err=>{
      alert('some error occured')
    }
  )
  }
  
  public sendmessage=()=>{
   
    if(!this.message){
      this.toastr.error('please provide any texts')
    }
    else {
      let data={
        message:this.message,
        senderId:this.userId,
        receiverId:this.receiverId,
        senderName:`${this.firstName} ${this.lastName}`
      }
    
      this.newmessage=this.message;
      this.socketService.sendmessage(data);
      this.message='';
      this.toastr.success('Message Sended Successfully');
       this.verifyUser();
       this.getonlineUsers()
    }
     
  }
  

  public receivemessage=()=>{
    this.socketService.receivemessage(this.userId).subscribe(
      data=>{
      
        this.toastr.success(`${data.senderName} send a message`)
        this.chtamessages=data;
       this.receivedmessges();
      }
    )
  }

  public receivemymessages=()=>{
   this.socketService.receivemymessage(`${this.userId} mymessages`).subscribe(
     result=>{
    
       this.messageLists.push(result);
       this.getvalues();
     }
   )
  }
 

  public getmessage=()=>{
    let data={
      senderId:this.userId,
    }
    this.service.getmessages(data).subscribe(
      data=>{
     
       this.mymessages=data.data;
         
          for(let message of data.data){

              this.messageLists.push(message)
            
          }
          this.getvalues();
         
      }
    )
  }


  public receivedmessges=()=>{
    let data={
      receiverId:this.userId
    }
    this.service.receivedmessages(data).subscribe(
      data=>{
     
        this.othermessages=data.data;
        for(let message of data.data){
            this.messageLists.push(message)  
        }
         this.getvalues();
      
      }
    )
  }

  public getvalues=()=>{
    this.list=sortOn(this.messageLists,['-createdOn']);
    this.finallist=this.list.reverse();
  
  }


}

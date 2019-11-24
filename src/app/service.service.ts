import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public baseUrl: string;
  authToken: any;
  

  constructor(public http:HttpClient) {
    this.baseUrl="/api/v1/users";
    this.authToken=Cookie.get('authToken');
   }
    //signup code start
    public signup=(data):any=>{
      let params=new HttpParams()
      .set("firstName",data.firstName)
      .set("lastName",data.lastName)
      .set("email",data.email)
      .set("password",data.password)
      .set("status",data.status)
      let datas=this.http.post(`${this.baseUrl}/signup`,params);
      return datas;
    }
    //signup code end

       //signin code start
       public signin=(data):any=>{
        let params=new HttpParams()
        .set("email",data.email)
        .set("password",data.password)
        let datas=this.http.post(`${this.baseUrl}/signin`,params);
        return datas;
      }
      //signin code end


      //get single user code start
       public getsingleuser=(data):any=>{
        let params=new HttpParams()
        .set("userId",data.userId)
        .set("authToken",data.authToken)
         let datas=this.http.post(`${this.baseUrl}/getsingleuser`,params);
         return datas;
       }
      //get single user code end



        //postImage code start
  public postImage=(data):any=>{
    let storydata=new FormData()
    storydata.append("userId",data.userId)
    storydata.append("type",data.type)
    storydata.append("imageTitle",data.imageTitle)
    storydata.append("image",data.image,data.name)

    let datas=this.http.post(`${this.baseUrl}/createstory`,storydata);
    return datas;
  }
  //poastImage code end

  //get stories code start
  public getstories=(data):any=>{
    let params=new HttpParams()
    .set("userId",data.userId)
    .set("authToken",data.authToken)
     let datas=this.http.post(`${this.baseUrl}/getstories`,params);
     return datas;
  }
  //get stories code end


   //getusers code start
       public getusers=(authToken):any=>{
         let datas=this.http.get(`${this.baseUrl}/getusers/${authToken}`);
         return datas;
       }
   //getusers code end


   //send friend requets code start
   public sendrequest=(data):any=>{
    let params=new HttpParams()
    .set("receiverId",data.receiverId)
    .set("senderId",data.senderId)
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/sendrequest`,params);
    return datas;
   }
   //send friend request code end


   //get friend req code start
   public getfriendreq=(userId,authToken):any=>{
    let datas=this.http.get(`${this.baseUrl}/getrequest/${userId}/${authToken}`);
    return datas;
  }
   //get friend req code end


   //accept req code strat
   public acceptrequest=(data):any=>{
    let params=new HttpParams()
    .set("friendreqId",data.friendreqId)
    .set("authToken",data.authToken)
   let datas=this.http.post(`${this.baseUrl}/acceptrequest`,params);
   return datas;
  }
   //accept req code end



   //delete req code start
   public deletefrnfreq=(data):any=>{
    let params=new HttpParams()
    .set("friendreqId",data.friendreqId)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/deletefriendrequest`,params);
    return datas;
  }
   //delete req code end


   //get friends code start
   public getfriends=(userId,authToken):any=>{
    let datas=this.http.get(`${this.baseUrl}/getfriends/${userId}/${authToken}`);
    return datas;
  }
   //get friends code end


   //unfriend code start
   public unfriend=(data):any=>{
    let params=new HttpParams()
    .set("friendId",data.friendId)
    .set("authToken",data.authToken)
     let datas=this.http.post(`${this.baseUrl}/unfriend`,params);
     return datas;
  }
   //unfriend code end


   //add comment code start
   public addcomment=(data):any=>{
    let params=new HttpParams()
    .set('storyId',data.storyId)
    .set('comment',data.comment)
    .set('senderId',data.senderId)
    .set('senderfirstName',data.senderfirstName)
    .set('senderlastName',data.senderlastName)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/addcomment`,params);
    return datas;
   }
   //add comment code end


   //get single post code start
   public getsinglepost=(data):any=>{
   let params=new HttpParams()
   .set('storyId',data.storyId)
   .set("authToken",data.authToken)
   let datas=this.http.post(`${this.baseUrl}/getsinglepost`,params);
   return datas;
   }
   //get single post code end


   //getcomments code start
   public getcomments=(data):any=>{
    let params=new HttpParams()
    .set('storyId',data.storyId)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/getcomment`,params);
    return datas;
    }
   //get comments code end

   
   //addlike code start
   public addlikes=(data):any=>{
    let params=new HttpParams()
    .set('storyId',data.storyId)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/addlikes`,params);
    return datas;
    }
   //addlike code end


   //get messages code start
   public getmessages=(data):any=>{
    let params=new HttpParams()
    .set('senderId',data.senderId)
    let datas=this.http.post(`${this.baseUrl}/getmessages`,params);
    return datas;
   }
   //get messages code end


   
   //get messages code start
   public receivedmessages=(data):any=>{
    let params=new HttpParams()
    .set('receiverId',data.receiverId)
    let datas=this.http.post(`${this.baseUrl}/receivedmessages`,params);
    return datas;
   }
   //get messages code end

   //deletepost code start
   public deletepost=(data):any=>{
    let params=new HttpParams()
    .set('storyId',data.storyId)
    .set("authToken",data.authToken)
    let datas=this.http.post(`${this.baseUrl}/deletepost`,params);
    return datas;
   }
   //deletepost code end



   //reset code start
   public resetcode=(data):any=>{
     console.log('called')
    let params=new HttpParams()
    .set('email',data.email)
    let datas=this.http.post(`${this.baseUrl}/resetcode`,params);
    return datas;
   }
   //reset code end


   //resetpassword code satrt
   public resetpassword=(data):any=>{
     console.log(data)
    let params=new HttpParams()
    .set('password',data.password)
    .set("resetId",data.resetcode)
    let datas=this.http.post(`${this.baseUrl}/resetpassword`,params);
    return datas;
   }
   //resetpassword code end
}

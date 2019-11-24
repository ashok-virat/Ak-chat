import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  baseUrl: string;
  socket: any;

  constructor() {
    this.baseUrl='http://13.235.94.255:4001';
    this.socket=io(this.baseUrl);
 
   }
   
        //verify and setuser code is called
        public verifyUser:any=()=>{
     
          let ak=Observable.create((observer)=>
          {
            this.socket.on('verifyUser',(data)=>{
              observer.next(data);
            }) 
          }) 
           return ak;
          } 
          public setUser=(userId)=>{
            
            this.socket.emit('set-user',userId);
          }
          //verify and setuser code is end
  
             //onlineuserlist code strat 
        public onlineUserList=()=>{
           console.log('is called')
          let ak=Observable.create((observer)=>{
            this.socket.on('online-user-list',(data)=>{
              console.log(data);
              observer.next(data)
            })
          })
          return ak;
        }
         //onlineuserlist code end
  
      
         //disconnected code start
         public disconnectedSocket=()=>{
          let ak=Observable.create((observer)=>{
            this.socket.emit("disconnect",()=>{
              observer.next();
            })
          })
          return ak;
        }
        //disconnected code end
  
        
        //exit socket code start
       public exitsocket=()=>{
        this.socket.disconnect();
       }
        //exit socket code end


        //send message code start
         public sendmessage=(data)=>{
           this.socket.emit('chat-message',data)
         }
        //send message code end
        


         //disconnected code start
         public receivemessage=(receiverId)=>{
           console.log(receiverId)
          let ak=Observable.create((observer)=>{
            this.socket.on(receiverId,(data)=>{
              observer.next(data);
            })
          })
          return ak;
        }
        //disconnected code end


        //receive my messages code start
        public receivemymessage=(senderId)=>{
          console.log(senderId)
         let ak=Observable.create((observer)=>{
           this.socket.on(senderId,(data)=>{
             observer.next(data);
           })
         })
         return ak;
       }
        //receive my messages code end


        //send request code strat
        public sendrequest=(data)=>{
          this.socket.emit('send-request',data)
        }
        //send request code end

        //receive my messages code start
        public receiverequest=(receiverId):any=>{
         let ak=Observable.create((observer)=>{
           this.socket.on(`${receiverId} reciverequest`,(data)=>{
             observer.next(data);
           })
         })
         return ak;
       }
        //receive my messages code end
}

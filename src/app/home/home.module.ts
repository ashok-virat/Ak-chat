import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostStoryComponent } from './post-story/post-story.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UsersComponent } from './users/users.component';
import { FriendReqComponent } from './friend-req/friend-req.component';
import { FriendsComponent } from './friends/friends.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewStoryComponent } from './view-story/view-story.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [HomeComponent, PostStoryComponent, UsersComponent, FriendReqComponent, FriendsComponent, ViewStoryComponent, ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild ([
      {path:"home/:userId",component:HomeComponent},
      {path:"poststory",component:PostStoryComponent},
      {path:"users",component:UsersComponent},
      {path:"friendreq",component:FriendReqComponent},
      {path:"friends",component:FriendsComponent},
      {path:"viewpost/:storyId",component:ViewStoryComponent},
      {path:"chat/:receiverId",component:ChatComponent},
    ])
  ]
})
export class HomeModule { }

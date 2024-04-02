import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { discussion } from 'src/app/model/discussion';
import { message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss'
})
export class DiscussionComponent implements OnInit {

  discussions:discussion[];
  discussion!:discussion;
  visible2: boolean = false;
  messagediscussion!:string;
  message!:message;
  utilisateur!:User;

  constructor(private discussionService: DiscussionService,
    private messageService:MessageService,
    public authService: AuthService,
    private router: Router,
    private userService: UserService)
  {}

  ngOnInit(): void {
    this.discussion=new discussion();
    this.message= new message();
    this.getAllDiscussions();
    this.getConnectedUser();
    
  }


  getAllDiscussions()
  {
    this.discussionService.getAllDiscussion().subscribe(
      response=>{
        this.discussions=response;
        this.discussions=this.discussions.filter(discussion => discussion.messages.length > 0);
        this.discussions=this.sortDiscussionsByRecentMessage(this.discussions);
      }
    )
  }

  sortDiscussionsByRecentMessage(discussions: discussion[]): discussion[] {
    // Pour chaque discussion
    for (let discussion of discussions) {
        // Trier les messages par date du plus récent au plus ancien
        discussion.messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Trier les discussions par date du message le plus récent
    discussions.sort((a, b) => {
        // Obtenez la date du message la plus récente pour chaque discussion
        const latestMessageDateA = a.messages.length > 0 ? new Date(a.messages[0].date) : new Date(0);
        const latestMessageDateB = b.messages.length > 0 ? new Date(b.messages[0].date) : new Date(0);
        // Triez les discussions en fonction de ces dates
        return latestMessageDateB.getTime() - latestMessageDateA.getTime();
    });

    return discussions;
}

afficherDiscussion(disc:discussion)
  {
    this.discussion=disc;
    this.discussion.messages.sort((a, b) => {
      return b.id - a.id;
  });
    this.visible2=true;
   
   
  }

  EnvoyerMessage()
  {
    this.message.message=this.messagediscussion;
    this.message.utilisateur=this.utilisateur;
    this.message.discussion=this.discussion;
    this.messageService.addMessage(this.message).subscribe(
      response=>{
       //this.getSujetsByUsername();
       this.getAllDiscussions();
       this.messagediscussion='';
       this.message=new message();
       this.visible2=false;
      }
    )
  }
  
  onCloseModal()
  {
    this.message=new message();
    this.visible2=false; 
  }

  getConnectedUser()
  {
    this.userService.get(this.authService.username).subscribe((data) => {
      this.utilisateur = data;
     // console.log(this.utilisateur.userId)
    });
  }

}

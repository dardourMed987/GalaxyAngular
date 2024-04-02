import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CritereEvaluation } from 'src/app/model/CritereEvaluation';
import { EvaluationLivrable } from 'src/app/model/EvaluationLivrable';
import { Critere } from 'src/app/model/critere';
import { Livrable } from 'src/app/model/livrable';
import { AuthService } from 'src/app/services/auth.service';
import { CritereService } from 'src/app/services/critere.service';
import { EvaluationLivrableService } from 'src/app/services/evaluation-livrable.service';
import { LivrableService } from 'src/app/services/livrable.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-evaluer-livrable',
  templateUrl: './evaluer-livrable.component.html',
  styleUrl: './evaluer-livrable.component.scss'
})
export class EvaluerLivrableComponent implements OnInit {

  idLivrable!:number;
  livrable!:Livrable;
  criteres:Critere[];
  critereEvaluation:CritereEvaluation[]=[];
  evaluationLivrable!:EvaluationLivrable;
  noteGenerale=0;
  commentairegenerale='';


  constructor(private route:ActivatedRoute,
              private criterService:CritereService,
              private livrableService:LivrableService,
              private evaluationLivrableService:EvaluationLivrableService,
              private userService:UserService,
              public authService: AuthService,
              private router: Router,)
  {}

  ngOnInit(): void {
    this.idLivrable=this.route.snapshot.params['id'];
    this.searchCriteres();
    this.searchLivrable()
    
    
  }

  searchCriteres()
  {
    this.criterService.getActivatedCriteres().subscribe(
      response=>{
        this.criteres=response;
        //console.log(this.criteres)
        for(let c of this.criteres)
        {
          this.critereEvaluation.push(new CritereEvaluation(c));
        }
      }
    )
  }
  searchLivrable()
  {
    this.livrableService.getLivrableById(this.idLivrable).subscribe(
      response=>
      {
        this.livrable=response;
      }
    )
    
  }
  validerLeFormulaire()
  {
    this.userService.get(this.authService.username).subscribe(
      
      response=>
      {
        this.evaluationLivrable=new EvaluationLivrable(this.noteGenerale,this.commentairegenerale,this.livrable,this.critereEvaluation,response);
        this.evaluationLivrableService.addEvaluationLivrable(this.evaluationLivrable).subscribe(
      response=>{
        console.log('test');
        this.router.navigateByUrl('/admin/livrable');
        

      }
    );
      }
    )
  
  
    
    
  }

  



}

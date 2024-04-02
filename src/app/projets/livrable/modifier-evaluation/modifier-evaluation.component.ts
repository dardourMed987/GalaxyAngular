import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationLivrable } from 'src/app/model/EvaluationLivrable';
import { EvaluationLivrableService } from 'src/app/services/evaluation-livrable.service';

@Component({
  selector: 'app-modifier-evaluation',
  templateUrl: './modifier-evaluation.component.html',
  styleUrl: './modifier-evaluation.component.scss'
})
export class ModifierEvaluationComponent implements OnInit {

evaluationlivrable!:EvaluationLivrable;
idevaluation!:number;


constructor(private route:ActivatedRoute,
  private evaluationLivrableService:EvaluationLivrableService,
  private router: Router,)
{}

  ngOnInit(): void {
    this.idevaluation=this.route.snapshot.params['id'];
    this.getEvaluationLivrable();
    
  }


  getEvaluationLivrable()
  {
    this.evaluationLivrableService.getEvaluationById(this.idevaluation).subscribe(
      response=>{
        this.evaluationlivrable=response
      }
    )
    
  }

  validerModification()
  {
    this.evaluationLivrableService.addEvaluationLivrable(this.evaluationlivrable).subscribe(
      response=>{
        console.log('test');
        this.router.navigateByUrl('/admin/livrable');

      }
    );
  }

}

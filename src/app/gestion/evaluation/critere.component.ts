import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Critere } from 'src/app/model/critere';
import { CritereService } from 'src/app/services/critere.service';

@Component({
  selector: 'app-critere',
  templateUrl: './critere.component.html',
  styleUrl: './critere.component.scss'
})
export class CritereComponent implements OnInit {


  criteres:[];
  visible=false;
  critereForm!: FormGroup;
  

  constructor(private critereService:CritereService,
    private fb: FormBuilder,)
  {}



  ngOnInit(): void {

    this.getAllCritere();
    this.critereForm = this.fb.group({
      nomCritere: this.fb.control(null, [Validators.required]),
      active: this.fb.control(false),
      
    });
    
  }


  getAllCritere()
  {
    this.critereService.getCriteres().subscribe(
      response=>{
        this.criteres=response;
      }
    )
  }

  goToAddCritere()
  {
    this.visible=true;
  }

  saveCritere()
  {
    this.critereService.addCritere(this.critereForm.value).subscribe(
      response=>
      {
        this.visible=false;
        this.getAllCritere();
      }
    )
  }

  handleChange(critere: Critere,e)
  {
    critere.active=e.checked;
    this.critereService.updateCritere(critere).subscribe(
      response=>{
        this.getAllCritere();
      }
    )
  }

  supprimerCritere(critere)
  {
    this.critereService.deleteCritere(critere.id).subscribe(
      response=>{
        this.getAllCritere();
      },
      error=>{
        alert('Suppression impossible : le critère est utilisé dans une évaluation')
        
      }
    )
  }






}

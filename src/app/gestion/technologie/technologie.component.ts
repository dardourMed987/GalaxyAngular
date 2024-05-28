import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/model/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-technologie',
  templateUrl: './technologie.component.html',
  styleUrl: './technologie.component.scss'
})
export class TechnologieComponent implements OnInit {

profiles!:Profile[];
technoligieForm!: FormGroup;
visible=false;


  constructor(private profileService: ProfileService,
    private fb: FormBuilder,
  )
  {}


  getAllProfiles()
  {
    this.profileService.getProfiles().subscribe(
      response=>
      {
        this.profiles=response;
      }
    )
  }


  ngOnInit(): void {

   this.getAllProfiles();

    this.technoligieForm = this.fb.group({
      libelle: this.fb.control(null, [Validators.required]),
      
    });
    

    
  }

  onCloseModal()
  {
    this.technoligieForm.reset();
  }

  goToAddTechnologie()
  {
    this.visible=true;
  }

  supprimerTechnologie(techno:Profile)
  {
    this.profileService.deleteProfile(techno.id).subscribe(
      reponse=>{
        this.getAllProfiles();
      },
      error=>{
        alert('Suppression impossible : la technologie est utilisée ')
      }
    )
  }

  saveTechnologie()
  {
    this.profileService.addProfiles(this.technoligieForm.value).subscribe(
      response=>{
        this.getAllProfiles();
        this.technoligieForm.reset();
        this.visible=false;
      }
    )
  }
  

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { Profile } from 'src/app/model/Profile';
import { ModuleFormation } from 'src/app/model/module-formation';
import { FormationService } from 'src/app/services/formation.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ModuleFormationService } from 'src/app/services/module-formation.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css'],
})
export class AddFormationComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload!: FileUpload;
  formationForm!: FormGroup;
  profiles!: Profile[];
  modules!: ModuleFormation[];
  selectedImageName: string = '';

  constructor(
    private formationService: FormationService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private moduleService: ModuleFormationService
  ) {}

  ngOnInit(): void {
    this.findAllProfiles();
    this.loadModules();
    this.formationForm = this.fb.group({
      profile: this.fb.control(null, Validators.required),
      modules: this.fb.control([], Validators.required),
      image: [null, Validators.required],
      description: [null, [
        Validators.required,
        Validators.minLength(10)
      ]],
    });
  }

  findAllProfiles() {
    this.profileService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  loadModules() {
    this.moduleService.getModules().subscribe((data) => {
      this.modules = data;
    });
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.formationForm.patchValue({
        image: file
      });

      this.selectedImageName = file.name;
      this.fileUpload.clear();
    }
  }

  createFormData(formValue: any): FormData {
    const formData = new FormData();
    formData.append('profile', formValue.profile.id);
    formData.append('description', formValue.description);
    formData.append('image', formValue.image);

    formValue.modules.forEach((module: any) => {
      formData.append('modules', module.id);
    });

    return formData;
  }

  onSubmit() {
    if (this.formationForm.valid) {
      const formData = this.createFormData(this.formationForm.value);
      this.formationService.createFormation(formData).subscribe(response => {
        console.log('Success:', response);
        this.router.navigateByUrl('/admin/formations');
      }, error => {
        console.error('Error:', error);
      });
    }
  }
}

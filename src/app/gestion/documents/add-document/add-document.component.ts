import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { DocumentServiceService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss'
})
export class AddDocumentComponent implements OnInit{

  documentForm!: FormGroup;
  selectedFileName='';
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  uploading: boolean = false;

constructor(private formBuilder: FormBuilder,
  private documentService: DocumentServiceService,
  private router:Router
)
{}



  ngOnInit(): void {
    

    this.documentForm = this.formBuilder.group({
      
      documentName: [null, [
        Validators.required,
        Validators.minLength(4)
      ]],
      doc: [null],
    });
  }

  onDocUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.documentForm.patchValue({
        doc: file
      });

      this.selectedFileName = file.name;
      this.fileUpload.clear(); 
    }
  }


  createFormData(formValue: any): FormData {
    const formData = new FormData();
    formData.append('documentName', formValue.documentName);
    formData.append('doc', formValue.doc);

    return formData;
  }

  

  onSubmit() {
    if (this.documentForm.valid) {
      this.uploading = true; 

     /* const documentName = this.documentForm.get('documentName').value;
    const doc = this.documentForm.get('doc').value;

    console.log('Document Name:', documentName);
    console.log('Document:', doc);*/


      const formData = this.createFormData(this.documentForm.value);
     
      
      this.documentService.createDocuement(formData).subscribe(response => {
        console.log('Success:', response);
        this.router.navigateByUrl('/admin/formation');
      }, error => {
        console.error('Error:', error);
        alert("erreur chargement du fichier")
      })
    }
  }

}

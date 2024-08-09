import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { DocumentServiceService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrl: './update-document.component.scss'
})
export class UpdateDocumentComponent {

  documentForm!: FormGroup;
  selectedFileName = '';
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  uploading: boolean = false;
  documentId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      documentName: [null, [
        Validators.required,
        Validators.minLength(4)
      ]],
      doc: [null],
    });

    this.documentId = this.route.snapshot.params['id'];
    

    this.loadDocumentDetails();
  }

  

  loadDocumentDetails() {
    this.documentService.getDocumentById(this.documentId).subscribe(
      res => {
        console.log('Document response:', res);
        this.documentForm.patchValue({
          documentName: res.documentName, 
        });
        this.selectedFileName = res.documentUrl; 
      },
      error => {
        console.error('Error loading document details:', error);
      }
    );
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
    if (formValue.doc) {
      formData.append('doc', formValue.doc);
    }
    return formData;
  }

  onSubmit() {
    if (this.documentForm.valid) {
      this.uploading = true;
      const formData = this.createFormData(this.documentForm.value);
      this.documentService.updateDocument(this.documentId, formData).subscribe(
        response => {
          console.log('Success:', response);
          this.router.navigateByUrl('/admin/formation');
        },
        error => {
          console.error('Error:', error);
          alert("Erreur lors de la mise à jour du fichier");
        }
      );
    }
  }

}

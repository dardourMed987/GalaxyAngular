import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtlisateurComponent } from './add-utlisateur.component';

describe('AddUtlisateurComponent', () => {
  let component: AddUtlisateurComponent;
  let fixture: ComponentFixture<AddUtlisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUtlisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUtlisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

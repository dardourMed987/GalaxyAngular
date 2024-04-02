import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSujet2Component } from './add-sujet2.component';

describe('AddSujet2Component', () => {
  let component: AddSujet2Component;
  let fixture: ComponentFixture<AddSujet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSujet2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSujet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

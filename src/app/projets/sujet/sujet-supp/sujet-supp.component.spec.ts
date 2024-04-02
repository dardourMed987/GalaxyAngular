import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetSuppComponent } from './sujet-supp.component';

describe('SujetSuppComponent', () => {
  let component: SujetSuppComponent;
  let fixture: ComponentFixture<SujetSuppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetSuppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SujetSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

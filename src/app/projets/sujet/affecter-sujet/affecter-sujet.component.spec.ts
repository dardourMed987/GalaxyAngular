import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterSujetComponent } from './affecter-sujet.component';

describe('AffecterSujetComponent', () => {
  let component: AffecterSujetComponent;
  let fixture: ComponentFixture<AffecterSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterSujetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

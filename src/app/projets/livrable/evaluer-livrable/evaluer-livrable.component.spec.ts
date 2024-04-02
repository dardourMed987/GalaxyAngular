import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerLivrableComponent } from './evaluer-livrable.component';

describe('EvaluerLivrableComponent', () => {
  let component: EvaluerLivrableComponent;
  let fixture: ComponentFixture<EvaluerLivrableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluerLivrableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluerLivrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

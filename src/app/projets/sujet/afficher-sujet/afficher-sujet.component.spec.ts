import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSujetComponent } from './afficher-sujet.component';

describe('AfficherSujetComponent', () => {
  let component: AfficherSujetComponent;
  let fixture: ComponentFixture<AfficherSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherSujetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

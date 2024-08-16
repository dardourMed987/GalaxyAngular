import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerpointViewerComponent } from './powerpoint-viewer.component';

describe('PowerpointViewerComponent', () => {
  let component: PowerpointViewerComponent;
  let fixture: ComponentFixture<PowerpointViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerpointViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerpointViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

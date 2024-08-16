import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponentComponent } from './video-player-component.component';

describe('VideoPlayerComponentComponent', () => {
  let component: VideoPlayerComponentComponent;
  let fixture: ComponentFixture<VideoPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

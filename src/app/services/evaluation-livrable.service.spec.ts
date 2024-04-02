import { TestBed } from '@angular/core/testing';

import { EvaluationLivrableService } from './evaluation-livrable.service';

describe('EvaluationLivrableService', () => {
  let service: EvaluationLivrableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationLivrableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

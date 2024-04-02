import { TestBed } from '@angular/core/testing';

import { DocumentProjetService } from './document-projet.service';

describe('DocumentProjetService', () => {
  let service: DocumentProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

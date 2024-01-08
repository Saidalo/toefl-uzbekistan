import { TestBed } from '@angular/core/testing';

import { NgBootstrapFormatterService } from './ng-bootstrap-formatter.service';

describe('NgBootstrapFormatterService', () => {
  let service: NgBootstrapFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgBootstrapFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

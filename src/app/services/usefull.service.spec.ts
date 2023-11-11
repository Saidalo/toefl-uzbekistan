import { TestBed } from '@angular/core/testing';

import { UsefullService } from './usefull.service';

describe('UsefullService', () => {
  let service: UsefullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsefullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

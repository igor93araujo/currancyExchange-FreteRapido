import { TestBed } from '@angular/core/testing';

import { GetDataAPIService } from './get-data-api.service';

describe('GetDataAPIService', () => {
  let service: GetDataAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

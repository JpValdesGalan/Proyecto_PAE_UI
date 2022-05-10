import { TestBed } from '@angular/core/testing';

import { HomeforumsService } from './homeforums.service';

describe('HomeforumsService', () => {
  let service: HomeforumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeforumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AwardService } from './award.service';

describe('AwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwardService = TestBed.get(AwardService);
    expect(service).toBeTruthy();
  });
});

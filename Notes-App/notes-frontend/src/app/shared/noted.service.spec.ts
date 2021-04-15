import { TestBed } from '@angular/core/testing';

import { NotedService } from './noted.service';

describe('NotedService', () => {
  let service: NotedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

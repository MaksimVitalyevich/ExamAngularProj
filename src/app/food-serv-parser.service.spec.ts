import { TestBed } from '@angular/core/testing';

import { FoodServParserService } from './food-serv-parser.service';

describe('FoodServParserService', () => {
  let service: FoodServParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodServParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

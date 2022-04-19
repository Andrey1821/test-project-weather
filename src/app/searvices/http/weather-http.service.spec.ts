import { TestBed } from '@angular/core/testing';

import { WeatherHttpService } from './weather-http.service';

describe('WeatherHttpService', () => {
  let service: WeatherHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

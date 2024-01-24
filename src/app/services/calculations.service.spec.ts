import { TestBed } from '@angular/core/testing';

import { CalculationsService } from './calculations.service';
import { DARK_TEXT, LIGHT_TEXT } from "@app/services/text-colors.const";

describe('CalculationsService', () => {
  let service: CalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return text color light', () => {
    const color= '#000000';
    expect(service.determineTextColor(color)).toEqual(LIGHT_TEXT);
  });

  it('should return text color light', () => {
    const color= '#FFFFFF';
    expect(service.determineTextColor(color)).toEqual(DARK_TEXT);
  });

  it('should return text color light', () => {
    const color= '#727272';
    expect(service.hexToRgb(color)).toEqual({r: 114, g: 114, b: 114});
  });

  it('should return a number between 1 and 100', () => {
    const randomAbitrary = service.getRandomArbitrary(1, 100);
    expect(randomAbitrary).toBeGreaterThanOrEqual(1);
    expect(randomAbitrary).toBeLessThanOrEqual(100);
  });

});

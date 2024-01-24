import { Injectable } from '@angular/core';
import { DARK_TEXT, LIGHT_TEXT } from "@app/services/text-colors.const";

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {
  getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  hexToRgb(hex: string): { r: number; b: number; g: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 255, g: 255, b: 255 };
  }

  determineTextColor(color: string): string {
    const rgb = this.hexToRgb(color);
    const brightness = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186;
    return brightness ? DARK_TEXT : LIGHT_TEXT;
  }
}

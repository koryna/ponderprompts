import { Component, ElementRef } from '@angular/core';
import de_prompts from '../assets/prompts.de.json';
import en_prompts from '../assets/prompts.en.json';
import colors from '../assets/colors.json';

export interface Color {
  backgroundColor: string;
  color: string;
}

export interface Prompt {
  type: string;
  title?: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // reload = 'Ich möchte lieber über etwas anderes nachdenken.';
  // switch = 'In english please?';
  // url = 'com';
  // prompts: Prompt[] = this.shuffle(de_prompts);

  reload = 'I\'d rather ponder about something else.';
  switch = 'Auf Deutsch bitte?';
  url = 'de';
  prompts: Prompt[] = this.shuffle(en_prompts);

  colors: string[] = this.shuffle(colors);
  prompt = this.prompts[this.getRandomArbitrary(0, this.prompts.length)];
  color = this.colors[this.getRandomArbitrary(0, this.colors.length)];
  title = 'ponderprompts';

  constructor(private elementRef: ElementRef) {
    this.generateColors();
  }

  // TODO: refactor into service
  getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // TODO: refactor into service
  shuffle(arr: any[]): any[] {
    // tslint:disable-next-line:one-variable-per-declaration
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  hexToRgb(hex: string): {r: number; b: number; g: number} {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  }

  giveMeAnotherPrompt(): void {
    this.prompt = this.prompts[this.getRandomArbitrary(0, this.prompts.length)];
    this.generateColors();
  }

  generateColors(): void {
    this.color = this.colors[this.getRandomArbitrary(0, colors.length)];
    const rgb = this.hexToRgb(this.color);
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.color;
    this.elementRef.nativeElement.ownerDocument.body.style.color = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? '#343330' : '#FEF9EF';
  }

}

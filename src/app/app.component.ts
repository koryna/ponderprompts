import { AfterViewInit, Component, ElementRef } from '@angular/core';
import prompts from '../assets/prompts.de.json';
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
export class AppComponent implements AfterViewInit {
  prompts: Prompt[] = this.shuffle(prompts);
  colors: Color[] = this.shuffle(colors);

  prompt = prompts[this.getRandomArbitrary(0, prompts.length)];
  color = colors[this.getRandomArbitrary(0, colors.length)];

  title = 'ponderprompts';

  constructor(private elementRef: ElementRef) {
  }

  // TODO: refactor into service
  getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // TODO: refactor into service
  shuffle(arr: any[]) {
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

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.color.backgroundColor;
    this.elementRef.nativeElement.ownerDocument.body.style.color = this.color.color;
  }
}

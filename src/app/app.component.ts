import { AfterViewInit, Component, ElementRef } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  reload = 'Ich möchte lieber über etwas anderes nachdenken.'; // 'I\'d rather ponder about something else.';
  switch = 'In english please?'; // 'Auf Deutsch bitte?';
  url = 'com'; // 'de';
  prompts: Prompt[] = this.shuffle(de_prompts); // this.shuffle(en_prompts);
  colors: Color[] = this.shuffle(colors);
  prompt = this.prompts[this.getRandomArbitrary(0, this.prompts.length)];
  color = colors[this.getRandomArbitrary(0, colors.length)];
  title = 'ponderprompts';

  constructor(private elementRef: ElementRef) {
  }

  // TODO: refactor into service
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
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

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.color.backgroundColor;
    this.elementRef.nativeElement.ownerDocument.body.style.color = this.color.color;
  }

}

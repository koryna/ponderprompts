import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';

import de_prompts from '@assets/prompts.de.json';
import en_prompts from '@assets/prompts.en.json';
import colors from '@assets/colors.json';

export interface Prompt {
  type: string;
  title?: string;
  content: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  lang = 'de';
  reload = this.lang === 'de' ? 'Ich möchte lieber über etwas anderes nachdenken.' : 'I\'d rather ponder about something else.';
  switch = this.lang === 'de' ? 'In english please?' : 'Auf Deutsch bitte?';
  url = this.lang === 'de' ? 'com' : 'de';
  prompts: Prompt[] = this.shuffle(this.lang === 'de' ? de_prompts : en_prompts);

  colors: string[] = this.shuffle(colors);
  prompt = this.prompts[this.getRandomArbitrary(0, this.prompts.length)];
  color = this.colors[this.getRandomArbitrary(0, this.colors.length)];
  title = 'ponderprompts';

  
  constructor(private elementRef: ElementRef,  
              private activatedRoute: ActivatedRoute, 
              private changeDetectorRef: ChangeDetectorRef) {
    this.generateColors();
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const prompt = params.prompt;
      if (prompt && prompt !== '') {
       this.prompt = {type: 'PROMPT', content: prompt};
      }
    });
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

  useHtml2Canvas(props: {width?: number, height?: number, x?: number, y?: number}): void {
    html2canvas(this.screen.nativeElement, props).then((canvas: { toDataURL: (arg0?: string | undefined) => any; }) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ponderprompt-'+this.color.replace('#', '')+'.png';
      this.downloadLink.nativeElement.click();
    });   
  }

  setupScreen(props?: {width?: number, height?: number}): void {
    this.screen.nativeElement.style.height = props?.height? props.height+'px' : 'auto';
    this.screen.nativeElement.style.width = props?.width?props.width+'px' : 'auto';
    this.screen.nativeElement.style.backgroundColor = this.color;
    this.changeDetectorRef.detectChanges();
  }

  downloadImage(): void {
    const props = window.screen.width > 1024 ? { width: 1280, height: 720 } : { width: 1080, height: 2340 };
    this.setupScreen(props);
    this.useHtml2Canvas(props);
    this.screen.nativeElement.removeAttribute('style');
  }
}

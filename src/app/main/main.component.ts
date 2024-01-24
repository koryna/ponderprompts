import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';

import de_prompts from '@assets/prompts.de.json';
import en_prompts from '@assets/prompts.en.json';
import colors from '@assets/colors.json';
import { CalculationsService } from "@app/services/calculations.service";
import { Prompt } from "@app/interfaces/prompt.interface";
import { ScreenProps } from "@app/interfaces/screen-props.interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  private service = inject(CalculationsService);

  lang = 'de';
  langIsGerman = this.lang === 'de';
  reload = this.langIsGerman ? 'Ich möchte lieber über etwas anderes nachdenken.' : 'I\'d rather ponder about something else.';
  switch = this.langIsGerman ? 'In english please?' : 'Auf Deutsch bitte?';
  url = this.langIsGerman ? 'com' : 'de';
  prompts: Prompt[] = this.shuffle(this.langIsGerman ? de_prompts : en_prompts);
  colors: string[] = this.shuffle(colors);
  prompt = this.prompts[this.service.getRandomArbitrary(0, this.prompts.length)];
  color = this.colors[this.service.getRandomArbitrary(0, this.colors.length)];
  title = 'ponderprompts';


  constructor(private elementRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {
    this.randomizeColor();
  }

  ngOnInit() {
    // Mein mega geheimer Geheim-Hack
    this.activatedRoute.params.subscribe(params => {
      const prompt = params.prompt;
      if (prompt && prompt !== '') {
        this.prompt = { type: 'PROMPT', content: prompt };
      }
    });
  }

  shuffle(arr: (Prompt|string|number)[]): any[] {
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

  getRandomColor(): string {
    return this.colors[this.service.getRandomArbitrary(0, colors.length)];
  }

  randomizeColor(): void {
    this.color = this.getRandomColor()
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.color;
    this.elementRef.nativeElement.ownerDocument.body.style.color = this.service.determineTextColor(this.color);
  }

  giveMeAnotherPrompt(): void {
    this.prompt = this.prompts[this.service.getRandomArbitrary(0, this.prompts.length)];
    this.randomizeColor();
  }

  useHtml2Canvas(props: { width?: number, height?: number, x?: number, y?: number }): void {
    html2canvas(this.screen.nativeElement, props).then((canvas: { toDataURL: (arg0?: string | undefined) => any; }) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = `ponderprompt${this.color.replace('#', '')}.png`;
      this.downloadLink.nativeElement.click();
    });
  }

  setupScreen({ width, height }: ScreenProps): void {
    this.screen.nativeElement.style.height = height ? `${height}px` : 'auto';
    this.screen.nativeElement.style.width = width ? `${width}px` : 'auto';
    this.screen.nativeElement.style.backgroundColor = this.color;
    this.changeDetectorRef.detectChanges();
  }

  downloadImage(): void {
    // Feature Idea: Offer dropdown with different resolution options to download
    const props = window.screen.width > 1024
      ? { width: 1280, height: 720 }
      : { width: 1080, height: 1080 };
    this.setupScreen(props);
    this.useHtml2Canvas(props);
    this.screen.nativeElement.removeAttribute('style');
  }
}

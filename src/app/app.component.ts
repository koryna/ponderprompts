import { Component } from '@angular/core';
import prompts from '../assets/prompts.de.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompts = prompts;
  title = 'ponderprompts';
}

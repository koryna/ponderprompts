import { Component, Input } from '@angular/core';
import { Prompt } from "@app/interfaces/prompt.interface";

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  @Input() prompt: Prompt;
}

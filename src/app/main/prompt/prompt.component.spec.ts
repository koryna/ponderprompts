import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptComponent } from './prompt.component';

describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    component.prompt = {
      type: 'QUESTION',
      content: 'Wer bist du wirklich?'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render question', () => {
    const fixture = TestBed.createComponent(PromptComponent);
    const app = fixture.componentInstance;
    app.prompt = {
      type: 'QUESTION',
      content: 'Was ist das sensibelste, dass ich jemals habe jemanden sagen hören?'
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.prompt').textContent).toContain('Was ist das sensibelste, dass ich jemals habe jemanden sagen hören?');
  });
});

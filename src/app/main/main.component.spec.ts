import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ponderprompts'`, () => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ponderprompts');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ponderprompts');
  });

  it('should update color and prompt', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const color = fixture.componentInstance.color;
    const prompt = fixture.componentInstance.prompt;
    fixture.componentInstance.giveMeAnotherPromptAndRandomizeColor();
    expect(fixture.componentInstance.color).not.toEqual(color);
    expect(fixture.componentInstance.prompt).not.toEqual(prompt);
  });

  it('should shuffle array', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'shuffle');
    const origArr = [13, 37, 73];
    const shuffledArr =  app.shuffle(origArr);
    fixture.detectChanges();
    expect(app.shuffle).toHaveBeenCalledWith(origArr);
    expect(origArr).not.toEqual(shuffledArr);
  });
});

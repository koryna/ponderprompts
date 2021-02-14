import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ponderprompts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ponderprompts');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ponderprompts');
  });

  it('should render question', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.color =  '#2F2D2E';
    app.prompt = {
      type: 'QUESTION',
      content: 'Was ist das sensibelste, dass ich jemals habe jemanden sagen hören?'
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.prompt').textContent).toContain('Was ist das sensibelste, dass ich jemals habe jemanden sagen hören?');
  });

  it('should shuffle array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'shuffle');
    const origArr = [13, 37, 73];
    const shuffledArr =  app.shuffle(origArr);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(app.shuffle).toHaveBeenCalledWith(origArr);
    expect(origArr).not.toEqual(shuffledArr);
  });

});

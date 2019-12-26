import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[],
      declarations: [
        AppComponent
      ],
      providers:[],
      schemas:[NO_ERRORS_SCHEMA]
    });
  }));

  xit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app', () => {
    const spiderMan = {
      fly: () => 'flying' ,
      spining: () => 'spining'
    };

    spyOn(spiderMan, 'spining').and.returnValue('running');
    const result = spiderMan.spining();
    expect(result).toBe('running');
  });

  it('should create the app', () => {
    const spiderMan = { fly: () => 'flying' } as any;
    spiderMan.spinning = jasmine.createSpy('spinning').and.returnValue('spinning');
    const result = spiderMan.spinning();
    expect(result).toBe('spinning');
  });

  it('should create the app', () => {
    const spiderMan = jasmine.createSpyObj('spiderMan', ['spinning']);
    spiderMan.spinning.and.returnValue('spinning');
    const result = spiderMan.spinning();
    expect(result).toBe('spinning');
  });



});

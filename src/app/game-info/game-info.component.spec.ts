import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { GameInfoComponent } from './game-info.component';
import { UserService } from '../user.service';
import { Observable, of, defer } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import 'zone.js/dist/zone-patch-rxjs-fake-async'
describe('GameInfoComponent', () => {
  let component: GameInfoComponent;
  let fixture: ComponentFixture<GameInfoComponent>;
  let userServiceStub: any;
  beforeEach(async(() => {

    userServiceStub =
      jasmine.createSpyObj('UserService',
        ['getUserID', 'validateUser', 'getBestScore', 'getBestRankingAsync']);

    userServiceStub.getBestRankingAsync.and.returnValue(of(1));

    TestBed.configureTestingModule({
      declarations: [GameInfoComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        AsyncPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Best score should greater 0, when the actual record is greather than 0', () => {
    userServiceStub.getBestScore.and.returnValue(180);
    fixture.detectChanges(); // ngOnInit()

    const deElement = fixture.debugElement.query(By.css('.info__bestRecordNum'));
    expect(deElement.nativeElement.textContent).toContain('180');
  });

  it(`Score description should be "You don't have record yet!!!", when getting 0 score`, () => {
    userServiceStub.getBestScore.and.returnValue(0);
    fixture.detectChanges(); // ngOnInit()

    const deElement = fixture.debugElement.query(By.css('.info__bestRecordDescription'));
    expect(deElement.nativeElement.textContent).toBe(`You don't have record yet!!!`);
  });

  it('Async Test: success with SetTimout', fakeAsync(() => {

    userServiceStub.getBestRankingAsync.and.returnValue(
      Observable.create(observer => {
        setTimeout(() => {
          observer.next(180);
        }, 200);
      })
    );
    fixture.detectChanges();

    tick(200);
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.info__bestRanking'));
    expect(div.nativeElement.textContent).toContain(180);
  }));

  it('Async Test: failed with async observables', fakeAsync(() => {

    userServiceStub.getBestRankingAsync.and.returnValue(
      defer(() => Promise.reject('unexpected thing happened!')))
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.info__errorDescription'));
    expect(div.nativeElement.textContent).toContain('unexpected thing happened!');

  }));

  it('Async Test: success with async observables using marble testing()', () => {

    const obs$ = cold('---x|', { x: 90 });
    userServiceStub.getBestRankingAsync.and.returnValue(obs$);
    fixture.detectChanges();

    getTestScheduler().flush(); // flush the observables
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('.info__bestRanking'));
    expect(div.nativeElement.textContent).toContain(90);
  });

});



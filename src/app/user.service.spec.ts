import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { DataBaseService } from './data-base.service';
import { of } from 'rxjs';


describe('UserService', () => {
  let mockDBService;

  beforeEach(() => {
    mockDBService = jasmine.createSpyObj('DataBaseService', ['getBestRecordForUser']);
    TestBed.configureTestingModule({
      providers: [
        { provide: DataBaseService, useValue: mockDBService }
      ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });


  it(`userService's getUserID() should work as expected `, () => {
    const service: UserService = TestBed.get(UserService);
    service.userID = 'John';
    expect(service.getUserID()).toBe('John');
  });



});

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';


describe('UserService', () => {
  let mockDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
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

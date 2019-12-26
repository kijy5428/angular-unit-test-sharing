import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() { }

  validateUser(userID): boolean {
    return true;
  }
}

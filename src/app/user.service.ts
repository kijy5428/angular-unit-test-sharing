import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthenService } from './authen.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthenService) { }

  allRecords = [
    { userID: 'john', score: 123 },
    { userID: 'RT12140323', score: 51 },
    { userID: '煞气"、"㊣"、"↗XXaXX↙', score: 67 },
    { userID: 'DaPinTai', score: 66 }
  ];

  userID;
  userBestRecord;


  getUserID() {
    if (!this.userID) { this.userID = 'john'; }
    return this.userID;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  validateUser() {
    return this.authService.validateUser(this.userID);
  }


  getBestScore(): any {
    const userRecord = this.allRecords.find(record => record.userID === this.userID);

    // when record found, return the score of this user!!
    if (userRecord !== undefined) {
      return userRecord.score;

      // if no corresponding user found, always return 0!
    } else { return 0; }
  }


  getBestRankingAsync(): any {
    const bestRank = of(180).pipe(delay(5000));
    return bestRank;
  }
}

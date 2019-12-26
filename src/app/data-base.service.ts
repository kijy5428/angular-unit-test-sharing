import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userRecords = [
    { userID: 'john', score: 123 },
    { userID: 'RT12140323', score: 51 },
    { userID: '煞气"、"㊣"、"↗XXaXX↙', score: 67 },
    { userID: 'DaPinTai', score: 66 }
  ];
  constructor() { }

  getBestRecord(userID: any): any {
    const userRecord = this.userRecords.find(record => record.userID === userID);

    // when record found, return the score of this user!!
    if (userRecord !== undefined) {
      return userRecord.score;

    // if no corresponding user found, always return 0!
    } else { return 0; }

  }
}

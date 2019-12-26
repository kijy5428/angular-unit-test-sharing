import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  userID: string;

  // authentication
  isvalid: boolean;

  // score
  userBestScore: number;
  scoreDescirption: string;

  // ranking
  userBestRanking: number;
  errorDescription: string;
  hasError = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // getting the user for template bining
    this.userID = this.userService.getUserID();

    // getting the user's best score to display on the info page
    this.userBestScore = this.userService.getBestScore();

    // get and assign score descriptions for current user
    if (this.userBestScore > 0) {
      this.scoreDescirption = 'Like a boss!!';

    } else {
      this.scoreDescirption = `You don't have record yet!!!`;
    }

    this.userService.getBestRankingAsync()
      .subscribe(
        (next: number) => {
          this.userBestRanking = next;
        },
        (err: string) => {
          this.userBestRanking = undefined;
          this.hasError = true;
          this.errorDescription = err;
        });

  }

}

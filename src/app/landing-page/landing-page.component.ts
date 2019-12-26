import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  userLoginForm;
  userID;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router

    ) { }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      userId: ['', Validators.required]
    });
  }

  handleUserID() {
    this.router.navigate(['/game']);
    this.userService.setUserID(this.userID);
  }


}

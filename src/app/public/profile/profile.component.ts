import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

interface IUserProfile {
  username: string,
  phoneNumber: string,
  email: string
}

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: IUserProfile;

  ngOnInit(): void {
    this.GetUserProfile();
  }

  GetUserProfile() {
    const { email, phoneNumber, username } = JSON.parse(localStorage.getItem('loggedInUser'));
    this.userProfile = {
      username,
      email,
      phoneNumber
    }
  }
}

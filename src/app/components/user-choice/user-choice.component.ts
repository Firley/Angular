import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.scss'],
  providers: [UserService]
})
export class UserChoiceComponent implements OnInit {
  user: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUsername();
  }

}

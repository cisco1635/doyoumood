import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[];

  constructor(private userservice: UserService) { }

  ngOnInit() {

    this.userservice.getUsers().subscribe((data: User[]) => {
      this.users = data
      console.log(this.users);
    })
      
  }

}

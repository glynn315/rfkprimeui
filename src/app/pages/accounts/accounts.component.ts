import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , PlusCircleIcon} from "lucide-angular";
import { AddaccountsComponent } from "./addaccounts/addaccounts.component";
import { UserService } from '../../Services/UserAccount/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/User/user.model';

@Component({
  selector: 'app-accounts',
  imports: [LucideAngularModule, AddaccountsComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  providers: [UserService],
})
export class AccountsComponent implements OnInit {

  constructor(private UserService : UserService){}

  UserData: User[] = [];

  ngOnInit(): void {
    this.DisplayData();
  }

  DisplayData(){
    this.UserService.displayUser().subscribe((data)=>{
      this.UserData = data;
    });
  }
  readonly plus = PlusCircleIcon;
  openAccountModal = false;
  openModal(){
    this.openAccountModal = true;
  }
  closeModal() {
    this.openAccountModal = false;
  }
  selectedUser: User | null = null;

  openAddUser(){
    this.selectedUser = null;
    this.openAccountModal = true;
  }

  openEditUser(user: User){
    this.selectedUser = user;
    this.openAccountModal = true;
}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../Services/UserAccount/user.service';
import { User } from '../../../model/User/user.model';

@Component({
  selector: 'app-addaccounts',
  imports: [ModalComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './addaccounts.component.html',
  styleUrl: './addaccounts.component.scss',
  providers: [UserService],
})
export class AddaccountsComponent implements OnInit {

  constructor(private UserService: UserService){}

  ngOnInit(): void {

  }

  UserFields: User ={
    user_fname: '',
    user_mname: '',
    user_lname: '',
    user_province: '',
    user_city: '',
    user_zip: 0,
    user_status: 'ACTIVE',
    user_username: '',
    user_password: ''
  }


  @Input() openAccountModal = false;
  headerText = 'Add New Users';
  @Output() openAccountModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.openAccountModalChange.emit(false);
  }

  AddNewUser(){
    this.UserService.AddNewUser(this.UserFields).subscribe(()=>{

    })

  }
}

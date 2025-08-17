import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../Services/UserAccount/user.service';
import { User } from '../../../model/User/user.model';
import { AccountsComponent } from '../accounts.component';

@Component({
  selector: 'app-addaccounts',
  imports: [ModalComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './addaccounts.component.html',
  styleUrl: './addaccounts.component.scss',
  providers: [UserService],
})
export class AddaccountsComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private accountComponents: AccountsComponent
  ){}

  ngOnInit(): void {}

  // Form fields
  UserFields: User = {
    user_id: '',
    user_fname: '',
    user_mname: '',
    user_lname: '',
    user_province: '',
    user_city: '',
    user_zip: 0,
    user_status: 'ACTIVE',
    user_username: '',
    user_password: '',
    userRole: '',
  };

  @Input() openAccountModal = false;
  @Input() editUser: User | null = null;   // 🔹 when passed, it's edit mode
  headerText = 'Add New User';
  @Output() openAccountModalChange = new EventEmitter<boolean>();

  get isEditMode(): boolean {
    return this.editUser !== null;
  }

  ngOnChanges(): void {
    if (this.editUser) {
      this.headerText = 'Edit User';
      this.UserFields = { ...this.editUser, user_password: '' }; // clear password
    } else {
      this.headerText = 'Add New User';
      this.resetForm();
    }
  }

  closeModal() {
    this.openAccountModalChange.emit(false);
  }

  saveUser(){
    if (this.isEditMode) {
      this.userService.UpdateUser(this.UserFields.user_id!, this.UserFields).subscribe(() => {
        this.accountComponents.DisplayData();
        this.closeModal();
      });
    } else {
      this.userService.AddNewUser(this.UserFields).subscribe(() => {
        this.accountComponents.DisplayData();
        this.closeModal();
      });
    }
  }

  resetForm() {
    this.UserFields = {
      user_id: '',
      user_fname: '',
      user_mname: '',
      user_lname: '',
      user_province: '',
      user_city: '',
      user_zip: 0,
      user_status: 'ACTIVE',
      user_username: '',
      user_password: '',
      userRole: '',
    };
  }
}

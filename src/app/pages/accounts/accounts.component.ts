import { Component } from '@angular/core';
import { LucideAngularModule , PlusCircleIcon} from "lucide-angular";
import { AddaccountsComponent } from "./addaccounts/addaccounts.component";

@Component({
  selector: 'app-accounts',
  imports: [LucideAngularModule, AddaccountsComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  readonly plus = PlusCircleIcon;
  openAccountModal = false;
  openModal(){
    this.openAccountModal = true;
  }
  closeModal() {
    this.openAccountModal = false;
  }
}

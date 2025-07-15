import { Component } from '@angular/core';
import { LucideAngularModule , PlusCircleIcon} from "lucide-angular";

@Component({
  selector: 'app-accounts',
  imports: [LucideAngularModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  readonly plus = PlusCircleIcon;
}

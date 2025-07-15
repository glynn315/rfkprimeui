import { Component } from '@angular/core';
import { LucideAngularModule , BoxIcon } from 'lucide-angular';

@Component({
  selector: 'app-inventory',
  imports: [LucideAngularModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  readonly box = BoxIcon;
}

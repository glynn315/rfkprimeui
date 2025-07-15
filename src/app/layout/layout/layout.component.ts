import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "../../shared/navigation/navigation.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}

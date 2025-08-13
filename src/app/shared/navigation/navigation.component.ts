import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink , HttpClientModule, CommonModule ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {

  user: any;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
    });
  }
}

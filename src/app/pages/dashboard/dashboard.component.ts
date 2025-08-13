import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
    });
  }

}

import { Component } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService]
})
export class HeaderComponent {
  readonly user = User;

  constructor(private AuthServices : AuthService, private router: Router) {}

  logout() {
    this.AuthServices.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Logout failed', err);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}

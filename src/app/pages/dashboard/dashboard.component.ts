import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/Auth/auth.service';
import { DashboardService } from '../../Services/Dashboard/dashboard.service';
import { DashboardModel } from '../../model/Dashboard/dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js'; 

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AuthService, DashboardService]
})
export class DashboardComponent implements OnInit {
  user: any;

  dashboardDisplay: DashboardModel = {
    dailySales: 0,
    itemRelease: 0,
    monthlySales: 0,
    totalIncome: 0,
    yearlySales: 0,
    totalCustomers: 0,
    salesGraph: []
  };
  public salesChartType: ChartType = 'bar';
  public salesChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Monthly Sales',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 2
      }
    ]
  };

  public salesChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  };

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
    });

    this.dashboardService.displayDashboard().subscribe((data) => {
      this.dashboardDisplay = data;

      if (data.salesGraph && data.salesGraph.length > 0) {
        this.salesChartData.labels = data.salesGraph.map((item: any) => 
          this.getMonthName(item.month)
        );
        this.salesChartData.datasets[0].data = data.salesGraph.map((item: any) => item.total);
      }
    });
  }

  private getMonthName(monthNumber: number): string {
    return new Date(0, monthNumber - 1).toLocaleString('en', { month: 'short' });
  }
}

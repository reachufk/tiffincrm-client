import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../services/admin-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todaysUser: number = 0;
  todaysOrders: number = 0;
  todaysSales: number = 0;

  dailyUsers: { day: string, count: number }[] = [];
  dailyUsersData: any = {};
  dailyUsersOptions: any = {};
  monthlyUsersData: any = {};
  monthlyUsersOptions: any = {};
  dailyOrdersData: any = {};
  dailyOrdersOptions: any = {};
  monthlyOrdersData: any = {};
  monthlyOrdersOptions: any = {};

  daysLabels: string[];
  monthLabels: string[];

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit() {
    this.daysLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.chartOptions();

    this.GetTodaysUser();
    this.GetTodaysOrder();
    this.GetTodaysSales();

    this.GetOrdersAnalyticsDaily();
    this.GetOrdersAnalyticsMonthly();

    this.GetUsersAnalyticsDaily();
    this.GetUsersAnalyticsMonthly();
  }

  chartOptions() {
    [
      this.dailyUsersOptions,
      this.monthlyUsersOptions,
      this.dailyOrdersOptions,
      this.monthlyOrdersOptions
    ].forEach((options) => {
      options = {
        plugins: {
          legend: {
            labels: {
              color: '#000'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#000'
            },
            grid: {
              color: '#f5f5f5'
            }
          }
        }
      };
    });
  };

  GetTodaysUser() {
    this.adminUserService.GetTodaysUser().subscribe((res: any) => {
      this.todaysUser = res.data;
    })
  }

  GetTodaysOrder() {
    this.adminUserService.GetTodaysOrder().subscribe((res: any) => {
      this.todaysOrders = res.data;
    })
  }

  GetTodaysSales() {
    this.adminUserService.GetTodaysSales().subscribe((res: any) => {
      this.todaysSales = res.data;
    })
  }

  GetUsersAnalyticsDaily() {
    this.adminUserService.GetUsersAnalyticsDaily().subscribe((res: any) => {
      if (res?.data?.length) {
        let labels = [];
        let data = [];
        res?.data?.forEach(element => {
          labels.push(element.day);
          data.push(element.count)
        });
        this.dailyUsersData = {
          labels,
          datasets: [
            {
              label: 'Total users',
              backgroundColor: '#EF4444',
              data
            }
          ]
        };
      }
    })
  }

  GetOrdersAnalyticsDaily() {
    this.adminUserService.GetOrdersAnalyticsDaily().subscribe((res: any) => {
      if (res?.data?.length) {
        let labels = [];
        let data = [];
        res?.data?.forEach(element => {
          labels.push(element.day);
          data.push(element.count)
        });
        this.dailyOrdersData = {
          labels,
          datasets: [
            {
              label: 'Total orders',
              backgroundColor: '#F59E0B',
              data
            }
          ]
        };
      }
    })
  }


  GetUsersAnalyticsMonthly() {
    this.adminUserService.GetUsersAnalyticsMonthly().subscribe((res: any) => {
      if (res?.data?.length) {
        let labels = [];
        let data = [];
        res?.data?.forEach(element => {
          labels.push(element.month);
          data.push(element.count)
        });
        this.monthlyUsersData = {
          labels,
          datasets: [
            {
              label: 'Total users',
              backgroundColor: '#EF4444',
              data
            }
          ]
        };
      }
    })
  }

  GetOrdersAnalyticsMonthly() {
    this.adminUserService.GetOrdersAnalyticsMonthly().subscribe((res: any) => {
      if (res?.data?.length) {
        let labels = [];
        let data = [];
        res?.data?.forEach(element => {
          labels.push(element.month);
          data.push(element.count)
        });
        this.monthlyOrdersData = {
          labels,
          datasets: [
            {
              label: 'Total orders',
              backgroundColor: '#F59E0B',
              data
            }
          ]
        };
      }
    })
  }

}

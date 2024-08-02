import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../service/people.service';
import { HttpClientModule } from '@angular/common/http';
import { Orders } from '../../models/orders';
import { OrderService } from '../../service/order.service';
import { Income } from '../../models/income';
import { IncomeService } from '../../service/income.service';
import { TasksService } from '../../service/tasks.service';
import { Tasks } from '../../models/tasks';

import { Chart, registerables } from 'chart.js';

export interface PeopleChart {
   jan: number
   feb: number
   mar: number
   apr: number
   may: number
   jun: number
   jul: number
   aug: number
   sep: number
   oct: number
   nov: number
   dec: number
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    PeopleService,
    OrderService,
    IncomeService,
    TasksService
  ]
})
export class DashboardComponent implements OnInit {
  constructor(
    private PeopleService: PeopleService,
    private OrderService: OrderService,
    private IncomeService: IncomeService,
    private TasksService: TasksService
  ) { Chart.register(...registerables) }

  orders: Orders = { total: 0, success: 0, inProgress: 0, canselled:0 }
  tasks: Tasks = { completed: 0, inProgress: 0, overdue: 0 }
  income: Income = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0
    }

  usersTotal: PeopleChart = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0
    
}

  chart:any
  chartOrders:any
  chartIncome:any
  chartTask:any

  ngOnInit(): void {
    this.PeopleService.getCustomers().subscribe({
      next: (data) => {
        this.usersTotal = data
        this.createChart()
      }
    })
    this.OrderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data
        this.createChartOrder()
      }
    })
    this.IncomeService.getIncome().subscribe({
      next: (data) => {
        this.income = data
        this.createChartIncome()
        
      }
    })
    this.TasksService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data
     this.createTaskChart()
      }
    })

   
 
  }

  
  createChart() {

   
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June','July','Aug', 'Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Users registered',
          data: Object.values(this.usersTotal),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  createChartOrder(){
    this.chartOrders = new Chart('chartOrders', {
      type: 'doughnut',
      data: {
        labels: ['Total','Succsses', 'In progress','Canselled' ],
        datasets: [{
          label: 'Users Registered',
          data: Object.values(this.orders),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 0, 0, 1)'

          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createChartIncome(){
    this.chartIncome = new Chart('chartIncome', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Income',
          data: Object.values(this.income),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

 createTaskChart(){
   this.chartTask = new Chart('chartTasks', {
     type: 'doughnut',
     data: {
       labels: ['Completed',  'In progress', 'Overdue'],
       datasets: [{
         label: 'Users Registered',
         data: Object.values(this.tasks),
         backgroundColor: [
           'rgba(0, 255, 0, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'red'
         ],
         borderColor: [
           'rgba(0, 255, 0, 1)',
           'rgba(54, 162, 235, 1)',
           'red',
         ],
         borderWidth: 1
       }]
     },
     options: {
       responsive: true
     }
   });
 }

  showUsers(){
    
    console.log(this.usersTotal);
    
  }
}


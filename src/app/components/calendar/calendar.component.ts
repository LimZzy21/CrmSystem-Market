import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../../service/task-list.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EventsService } from '../../service/events.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendar',
  imports: [HttpClientModule, NgFor, NgIf, FormsModule, NgClass, RouterLink],
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [TaskListService, EventsService]
})
export class CalendarComponent implements OnInit {
  constructor(private taskListService: TaskListService, private EventsService: EventsService, private router: Router) { }
  deadlines: any[] = [];
  events: any = [];

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  monthName: string = '';
  currentYear = this.currentDate.getFullYear();
  weeks: { date: Date, label: string, dayName: string }[][] = [];

  
  showModal: boolean = false;
  newEventTitle: string = '';
  newEventDate: string = '';

  ngOnInit(): void {
    this.getDeadlines();
    this.generateCalendar();
  }

  gotoTaks(){
    this.router.navigate(['auth/task'])
  }

  getDeadlines() {
    this.taskListService.getTasks().subscribe({
      next: data => {
        this.deadlines = data.map(task => {
          let parts = task.deadline.split('-');
          
          if (parts.length === 3) {
            return {
              year: parseInt(parts[0], 10),
              month: parseInt(parts[1], 10) - 1,
              date: parseInt(parts[2], 10),
              title: task.title 
            };
          } else {
            return null;
          }
        }).filter(deadline => deadline !== null);
        this.updateCalendar();
      }
    });

    this.EventsService.getEvents().subscribe({
      next: data => this.events = data
    })
    

  }

  hasDeadline(date: Date): boolean {
    return this.deadlines.some(deadline =>
      deadline.date === date.getDate() &&
      deadline.month === date.getMonth() &&
      deadline.year === date.getFullYear()
    );
  }

  getDeadlineTitle(date: Date): string | null {
    const deadline = this.deadlines.find(deadline =>
      deadline.date === date.getDate() &&
      deadline.month === date.getMonth() &&
      deadline.year === date.getFullYear()
    );
    return deadline ? deadline.title : null;
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    let week: { date: Date, label: string, dayName: string }[] = [];

    this.monthName = this.months[this.currentMonth];

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDay = new Date(this.currentYear, this.currentMonth, day);
      
      
      const dayOfWeek = currentDay.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        week.push({
          date: currentDay,
          label: day.toString(),
          dayName: this.daysOfWeek[dayOfWeek - 1]
        });
        if (week.length === 5) {
          this.weeks.push(week);
          week = [];
        }
      }
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    

    
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.weeks = [];
    this.generateCalendar();
  }


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newEventTitle = '';
    this.newEventDate = '';
  }

  saveEvent(): void {
    const [year, month, day] = this.newEventDate.split('-').map(Number);
    this.events.push({
      title: this.newEventTitle,
      date: day,
      month: month - 1,
      year: year
    });
   
  
    const event = {title:this.newEventTitle, date:day, month:month - 1, year:year}
    this.EventsService.updateEvent({ title: this.newEventTitle, date: day, month: month - 1, year: year }).subscribe()
    this.closeModal();
    this.updateCalendar();
  }
}

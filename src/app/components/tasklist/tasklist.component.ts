import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../../service/task-list.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskList } from '../../models/task-list';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../service/tasks.service';
import { Tasks } from '../../models/tasks';



@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
  providers: [TaskListService, TasksService]
})
export class TasklistComponent implements OnInit {
  constructor(
    private TaskListService: TaskListService,
    private TaskServise: TasksService,
  ) { }

  tasks: TaskList[] = []
  tasksDetails: Tasks = { completed: 0, inProgress: 0, overdue: 0 }
  activeTab: number = 0

  ngOnInit(): void {
    this.TaskListService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.reverse()
      }
    })

    this.TaskServise.getTasks().subscribe({
      next: (data) => {

        this.tasksDetails = data
        this.isOverdue()
      }
    })

  }

  isOverdue() {
    this.tasks.filter(el => {
      if (el.isDone == false) {
        const dt = el.deadline.split('-')
        let date = new Date
        const arr = []
        if (date.getDate() < 10) {
          arr.push(`0${date.getDate()}`)
        } else {
          arr.push(`${date.getDate()}`)
        }
        if (date.getMonth() + 1 < 10) {
          arr.push(`0${date.getMonth() + 1}`)
        } else {
          arr.push(`${date.getMonth() + 1}`)
        }
        
        if (arr[1] > dt[1]  ) {
          this.tasksDetails.overdue++
        } else if (arr[0] > dt[2]) {
          this.tasksDetails.overdue++
        }
      }
    })
  }


  onTabChange(tabStatus: number) {
    this.activeTab = tabStatus
  }

  getFilteredItems() {
    return this.tasks.filter(el => el.isDone === !!this.activeTab)
  }

  getTaskByProj(projName:string){
    return this.tasks.filter(el => (el.projectName == projName) && (el.isDone === !!this.activeTab))
  }

  markAsDone(id: string) {
    const task = this.tasks.find(task => task.id == id)
    if (task) {
      const updatedTask = { ...task, isDone: !task.isDone }
      this.TaskListService.markAsDone(id, updatedTask).subscribe({
        next: res => {
          this.tasks = this.tasks.map(el => el.id == id ? res : el);
        }
      })
      if (this.activeTab == 0) {
        this.tasksDetails.inProgress--
        this.tasksDetails.completed++
      } else if (this.activeTab == 1) {
        this.tasksDetails.completed--
        this.tasksDetails.inProgress++
      }

      
      this.TaskServise.addTaskCounter(this.tasksDetails).subscribe()
    }
  }

  createTask() {
    if (this.addTaskForm.valid) {
      const { title, deadline, description, projectName } = this.addTaskForm.value;
      const task = new TaskList(`${Date.now()}`, title, description, deadline, false, projectName);

      this.TaskListService.addTask(task).subscribe({
        next: (newTask) => {
          this.TaskListService.getTasks().subscribe({
            next: (data) => {
              this.tasks = data;
              this.activeTab = 0;
            }
          });
        }
      });
      this.tasksDetails.inProgress++
      
      this.TaskServise.addTaskCounter(this.tasksDetails).subscribe()
    
      this.addTaskForm.reset()
    }
  }



  addTaskForm: FormGroup = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.min(4)]),
    'description': new FormControl('', ),
    'deadline': new FormControl('', [Validators.required]),
    'projectName': new FormControl('Choose a project', [Validators.required])
  })


}

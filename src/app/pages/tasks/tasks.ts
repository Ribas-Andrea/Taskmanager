import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Task } from "../../components/task/task";
import { Api } from '../../services/api';


export interface Tasktype {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  imports: [RouterLink, Task],
  selector: 'app-tasks',
  styleUrl: './tasks.css',
  templateUrl: './tasks.html',
})
export class Tasks {

public tasks = signal<Tasktype[]>([]);

constructor(private api: Api) {
  this.refreshTasks();
}

public refreshTasks() {
  this.api.getTasks()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.tasks.set(response);
      }
    })
}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Tasktype } from '../../pages/tasks/tasks';
import { Api } from '../../services/api';

@Component({
  imports: [RouterLink],
  selector: 'app-task',
  styleUrl: './task.css',
  templateUrl: './task.html',
})
export class Task {
  @Input() tache!: Tasktype;
  @Output() update = new EventEmitter<boolean>();

  constructor(private api: Api) {

  }

  public finishTask() {
   this.api.updateTask(this.tache.id, {status: 'done'})
    .subscribe({
      next: () => {
        this.update.emit(true);
      }
    }
    )
  }

  public deleteTask() {
    this.api.deleteTask(this.tache.id)
    .subscribe({
      next: () => {
        this.update.emit(true);
        console.log("Tâche suprimée");
      }
    }
    )
  }
}

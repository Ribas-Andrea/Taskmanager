import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-create-task',
  styleUrl: './create-task.css',
  templateUrl: './create-task.html',
})
export class CreateTask {
  public taskForm: FormGroup


  constructor(private api: Api, private router: Router){
    this.taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
    })
  }

  public createTask(){
    if(this.taskForm.valid) {
      const task = this.taskForm.value;
      task.status = 'todo';
      // Appel API : 
      this.api.createTask(task)
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        }
      })
    } else {
      this.taskForm.markAllAsTouched();
    }

  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-task',
  styleUrl: './edit-task.css',
  templateUrl: './edit-task.html',
})
export class EditTask {

  public id!: number;
  public taskForm: FormGroup;


  constructor(private route: ActivatedRoute, private api: Api, private router: Router){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
    })

    this.api.getTask(this.id)
    .subscribe({
      next: response => {
        this.taskForm.setValue(response);
      }
    })
  }

  public editTask(){
    if(this.taskForm.valid) {
      const task = this.taskForm.value;
      // Appel API : 
      this.api.updateTask(this.id, task)
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

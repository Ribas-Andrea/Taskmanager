import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Tasktype } from '../pages/tasks/tasks';

@Service()
export class Api {

  private http = inject(HttpClient);
  private url = 'http://localhost:3000/';
  private getHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  }

  public login(data: { email: string, password: string }) {
    return this.post('login', data);
  }

  public register(data: { email: string, password: string }) {
    return this.post('register', data);
  }

  public getTasks(){
    return this.get('tasks');
  }

  public createTask(data: Tasktype){
    return this.post('tasks/', data);
  }

  public getTask(id: number){
    return this.get('tasks/' + id);
  }

  public updateTask(id: number, data: Partial<Tasktype>){
    return this.patch('tasks/' + id, data);
  }

  public deleteTask(id: number){
    return this.delete('tasks/' + id);
  }

  private get(action: string) {
    return this.http.get<Tasktype[]>(this.url + action, this.getHeaders())
  }


  private post(action: string, data: any) {
    return this.http.post(this.url + action, data, this.getHeaders());
  }

  private patch(action: string, data: any) {
    return this.http.patch(this.url + action, data, this.getHeaders());
  }
  
  private delete(action: string) {
    return this.http.delete(this.url + action, this.getHeaders());
  }

}
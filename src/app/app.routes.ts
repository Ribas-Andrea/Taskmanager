import { Routes } from '@angular/router';
import { CreateTask } from './pages/create-task/create-task';
import { EditTask } from './pages/edit-task/edit-task';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Tasks } from './pages/tasks/tasks';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'tasks', component: Tasks},
  {path: 'tasks/new', component: CreateTask},
  {path: 'task/:id', component: EditTask}
];

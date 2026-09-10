import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideLocationMocks } from "@angular/common/testing";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { of } from "rxjs";
import { vi } from "vitest";
import { Api } from "../../services/api";
import { Login } from "./login";

describe('Login Component', () => {

  let component: Login;
  let fixture: any;
  let apiService: any;
  let router: any;

  beforeEach(async () => {

    const apiSpy = {
      login: vi.fn()
    };

    const routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: Api, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([]),
        provideLocationMocks(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    apiService = TestBed.inject(Api) as typeof apiService;
    router = TestBed.inject(Router) as typeof router;
  });

  it('Il doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('Il devrait y avoir un formulaire invalid s\'il est vide', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Il devrait y avoir un appel API ainsi qu\'une redirection', () => {

    const mockResponse = {
      accessToken: 'abc123'
    };

    apiService.login.mockReturnValue(of(mockResponse));

    component.loginForm.setValue({
      email: 'test12345@test.com',
      password: 'password'
    });

    component.onSubmit();

    expect(apiService.login).toHaveBeenCalledWith({
      email: 'test12345@test.com',
      password: 'password'
    });

    expect(localStorage.getItem('token')).toBe('abc123');

    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);

    expect(component.error()).toBe('');
  });

});
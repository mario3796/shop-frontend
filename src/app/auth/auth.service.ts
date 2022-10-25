import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private tokenTimer?: NodeJS.Timer; 
  private token?: string | null;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  
  constructor(private http: HttpClient, private router: Router) { }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  
  getToken() {
    return this.token;
  }

  calculateRemainingTime(expTime: number) {
    const currentTime = new Date().getTime();
    const expiresTime = new Date(expTime).getTime() * 1000;
    const duration = expiresTime - currentTime;
    console.log('Duration: ' + duration);
    return duration
  }

  signup(userData: User) {
    return this.http.post(this.apiUrl+'signup', JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(err => {
      throw err
    }))
  }

  login(userData: User) {
    return this.http.post<{token: string, expirationTime: any, userId: any}>
    (this.apiUrl+'login', JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(map(data => {
      console.log(data);
      this.token = data.token
      if (this.token) {
        const expiresIn = data.expirationTime;
        const duration = this.calculateRemainingTime(expiresIn);
        this.tokenTimer = setTimeout(() => this.logout(), duration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
      }
      this.saveAuthData({userId: data.userId, token: data.token, expiresTime: data.expirationTime})
    }), catchError(err => {
      throw err
    }))
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return
    }
    let duration = this.calculateRemainingTime(+authInformation.expiresTime);
    if (duration > 0) {
      this.tokenTimer = setTimeout(() => this.logout(), duration)
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  logout() {
    if (this.tokenTimer)
      clearTimeout(this.tokenTimer);
      this.token = null;
      this.isAuthenticated = false
      this.authStatusListener.next(false);
      this.clearAuthData();
      this.router.navigateByUrl('/');
    console.log({ message: 'Logged out successfully!' });
  }

  private saveAuthData(userData: {userId: string, token: string, expiresTime: string}) {
    localStorage.setItem('userId', userData.userId)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('expiresTime', userData.expiresTime)
  }

  private clearAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresTime')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expiresTime = localStorage.getItem('expiresTime');
    if (!token || !expiresTime) return;
    return {
      token, expiresTime
    }
  }
}

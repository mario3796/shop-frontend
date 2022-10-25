import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit, OnDestroy {
  private authListenerSubs?: Subscription;
  isAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }

  onLogout() {
    this.authService.logout()
  }

}

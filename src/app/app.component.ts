import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { ModalService } from './shared/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  show = false
  content = ''
  private modalContentSubs?: Subscription
  private modalShowSubs?: Subscription
  constructor(private authService: AuthService, private modalService: ModalService) {}

  ngOnInit() {
    this.modalShowSubs = this.modalService.getModalShowListener()
    .subscribe(show => {
      this.show = show
    })
    this.modalContentSubs = this.modalService.getModalContentListener()
    .subscribe(content => {
      this.content = content
    })
    this.authService.autoAuthUser();
  }

  ngOnDestroy() {
    this.modalContentSubs?.unsubscribe()
    this.modalShowSubs?.unsubscribe()
  }
}

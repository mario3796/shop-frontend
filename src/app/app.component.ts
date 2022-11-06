import { Component, OnInit, DoCheck } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { ModalService } from './shared/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  modalContent = ''
  modalShow = false
  constructor(private authService: AuthService, private modalService: ModalService) {}
  
  ngDoCheck(): void {
    this.modalShow = this.modalService.getModalStatus().show
    this.modalContent = this.modalService.getModalStatus().content
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}

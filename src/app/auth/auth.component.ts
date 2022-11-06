import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalService } from '../shared/modal/modal.service';
import { AuthService } from './auth.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogin = false;
  error = null
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null),
    password: new FormControl(null, [Validators.required, Validators.min(6)])
  })
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    if (this.router.url === '/auth/login') {
      this.isLogin = true
    } else {
      const username = new FormControl(null, [Validators.required, Validators.min(2)])
      this.authForm.setControl('username', username)
    }
  }

  onSubmit() {
    console.log(this.authForm)
    const user = { ...this.authForm.value } as unknown as User
    if (this.isLogin) {
      this.authService.login(user)
      .subscribe(() => {
        this.router.navigateByUrl('/')
      }, err => {
        console.log(err);
        this.error = err.error.message
      })
      return
    }
    this.authService.signup(user)
    .subscribe(() => {
      this.modalService.setModal('SIGN_IN')
      this.router.navigateByUrl('/auth/login')
    }, err => {
      console.log(err)
      this.error = err.error.message
    })
  }

}

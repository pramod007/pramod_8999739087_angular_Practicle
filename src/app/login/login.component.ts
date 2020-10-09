import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup

  constructor(public fb: FormBuilder, public gs: GlobalService) { }

  ngOnInit(): void {
    if (this.gs.isLogin()) {
      this.gs.navigate('employee')
    }
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['admin@gmail.com'],
      password: ['123456']
    })
  }

  login() {
    try {
      if (JSON.stringify(this.form.value) == JSON.stringify(this.gs.user)) {
        this.gs.setLocalStorage('activeUser', this.form.value)
        this.gs.navigate('employee')
      } else {
        console.log('hello')
        this.gs.showToast('error', 'Wrong Credentials')
      }
    } catch (error) {
      console.log(error)
    }
  }

}

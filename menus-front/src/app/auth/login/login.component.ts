import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodAuthService } from 'src/app/shared/services/food-auth.service';

@Component({
  selector: 'menus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: FoodAuthService) {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.connect(this.form.value);
  }

  onLoginGoogle() {
    this.authService.connectWithGoogle();
  }
}

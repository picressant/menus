import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FoodAuthService } from '@services/food-auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(
      private builder: UntypedFormBuilder,
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

  get deployPath(): string {
    return environment.deployUrl;
  }


}

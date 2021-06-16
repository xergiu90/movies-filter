import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isInvalidCredentials = false;
  hidePassword = true;

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.isInvalidCredentials) {
      return 'Invalid credentials';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,) {}

  onLogin() {
    if(this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)) {
      this.isInvalidCredentials = false;
      this.dialogRef.close();
      this.cdr.detectChanges();
    } else {
      this.isInvalidCredentials = true;
    }
  }

}

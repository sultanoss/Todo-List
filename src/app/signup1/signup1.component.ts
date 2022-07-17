import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentification.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {

      return {
        passwordsDontMatch: true
      }

    }
    return null  // wenn password und confirmpassword  sind gleich retur null == return kein fehler
  };
}

@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.component.html',
  styleUrls: ['./signup1.component.scss']
})
export class Signup1Component implements OnInit {

  signUpForm = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)

  }, { validators: passwordsMatchValidator() })

  constructor(private autService:AuthenticationService,
    private toast:HotToastService,
    private route:Router) { }

  ngOnInit(): void {
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const {name,email,password} = this.signUpForm.value;
    this.autService.signUp(name,email,password).pipe(
      this.toast.observe({
        success:'Congrats! you are signed up.',
        loading:'Signin in',
        error:({ message }) => `${ message }`
      })
    ).subscribe(()=>{
    this.route.navigate(['/home'])
    })
  }

}

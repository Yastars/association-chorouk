import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAccountDto } from 'src/app/Models/user-account-dto.model';

import { MatStepper } from '@angular/material/stepper';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  userAccountDto: UserAccountDto;

  loading = false;
  error = "";
  
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'password2')
    });
    this.secondFormGroup = this._formBuilder.group({
      cin: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.userAccountDto = new UserAccountDto();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.firstFormGroup.controls;
  }

  get f2() {
    return this.secondFormGroup.controls;
  }

  onFirstStep() {
    if (this.firstFormGroup.invalid) {
      return;
    }

    this.userAccountDto.user = this.firstFormGroup.value;
    console.log({
      HELLO: this.userAccountDto,
    });
  }

  onSecondStep() {
    if (this.secondFormGroup.invalid) {
      return;
    }

    this.loading = true;
    this.userAccountDto.account = this.secondFormGroup.value;
    this.userAccountDto.account.is_Accepted = false;

    this.authService.register(this.userAccountDto).subscribe({
      next: (data) => {
        console.log('Registered with succes');
        this.stepper.next();
        // this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}

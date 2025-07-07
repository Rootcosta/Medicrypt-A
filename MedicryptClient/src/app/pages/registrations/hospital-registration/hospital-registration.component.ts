import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Web3Service } from '../../../web3/web3.service';

@Component({
  selector: 'app-hospital-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss'],
})
export class HospitalRegistrationComponent {
  hospitalForm: FormGroup;
  loading = false;
  passwordMismatch = false;
  submissionSuccess = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {
    this.hospitalForm = this.fb.group({
      name: ['', Validators.required],
      regNumber: ['', Validators.required],
      hospitalType: ['', Validators.required],
      addressInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branch: ['', Validators.required],
      website: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  async registerHospital() {
    if (this.hospitalForm.invalid) {
      this.submissionError = 'Please fill all required fields correctly.';
      return;
    }

    const form = this.hospitalForm.value;

    if (form.password !== form.confirmPassword) {
      this.passwordMismatch = true;
      this.submissionError = 'Passwords do not match.';
      return;
    }

    this.passwordMismatch = false;
    this.loading = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    try {
      const tx = await this.web3Service.registerHospital({
        name: form.name,
        regNumber: form.regNumber,
        hospitalType: form.hospitalType,
        addressInfo: form.addressInfo,
        email: form.email,
        phone: form.phone,
        branch: form.branch,
        website: form.website,
        password: form.password,
      });

      console.log('Hospital registered:', tx);
      this.submissionSuccess = true;
      this.hospitalForm.reset();
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error?.message?.includes('Already registered')) {
        this.submissionError =
          'This address is already registered as a hospital.';
      } else if (error?.code === 4001) {
        this.submissionError = 'Transaction rejected by user.';
      } else {
        this.submissionError = 'Registration failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}

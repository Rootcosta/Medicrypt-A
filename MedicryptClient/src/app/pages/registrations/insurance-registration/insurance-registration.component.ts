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
  selector: 'app-insurance-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insurance-registration.component.html',
  styleUrls: ['./insurance-registration.component.scss'],
})
export class InsuranceRegistrationComponent {
  insuranceForm: FormGroup;
  passwordMismatch = false;
  submitting = false;
  submissionSuccess = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {
    this.insuranceForm = this.fb.group({
      insuranceName: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      insuranceType: ['', Validators.required],
      addressInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branch: ['', Validators.required],
      insuranceCover: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  async registerInsurance() {
    if (this.insuranceForm.invalid) return;

    const form = this.insuranceForm.value;

    if (form.password !== form.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;
    this.submitting = true;
    this.submissionSuccess = false;
    this.submissionError = null;

    try {
      const receipt = await this.web3Service.registerInsurance({
        insuranceName: form.insuranceName,
        title: form.title,
        firstName: form.firstName,
        lastName: form.lastName,
        registrationNumber: form.registrationNumber,
        insuranceType: form.insuranceType,
        addressInfo: form.addressInfo,
        email: form.email,
        phone: form.phone,
        branch: form.branch,
        insuranceCover: form.insuranceCover,
        password: form.password,
      });
      console.log('Insurance registered:', receipt);
      this.submissionSuccess = true;
      this.insuranceForm.reset();
    } catch (err: any) {
      console.error('Registration failed:', err);
      this.submissionError = err.message || 'Registration failed';
    } finally {
      this.submitting = false;
    }
  }
}

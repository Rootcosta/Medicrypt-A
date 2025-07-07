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
  selector: 'app-laboratory-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './laboratory-registration.component.html',
  styleUrls: ['./laboratory-registration.component.scss'],
})
export class LaboratoryRegistrationComponent {
  labForm: FormGroup;
  passwordMismatch = false;
  submitting = false;
  submissionSuccess = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {
    this.labForm = this.fb.group({
      photo: ['', Validators.required],
      labName: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      referredHospital: ['', Validators.required],
      addressInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branch: ['', Validators.required],
      website: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  async registerLaboratory() {
    if (this.labForm.invalid) return;

    const form = this.labForm.value;

    if (form.password !== form.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;
    this.submitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    try {
      const result = await this.web3Service.registerLaboratory({
        photo: form.photo,
        labName: form.labName,
        title: form.title,
        firstName: form.firstName,
        lastName: form.lastName,
        registrationNumber: form.registrationNumber,
        referredHospital: form.referredHospital,
        addressInfo: form.addressInfo,
        email: form.email,
        phone: form.phone,
        branch: form.branch,
        website: form.website,
        password: form.password,
      });
      console.log('Registered:', result);
      this.submissionSuccess = true;
      this.labForm.reset();
    } catch (err: any) {
      console.error('Registration error:', err);
      this.submissionError = err.message || 'Registration failed';
    } finally {
      this.submitting = false;
    }
  }
}

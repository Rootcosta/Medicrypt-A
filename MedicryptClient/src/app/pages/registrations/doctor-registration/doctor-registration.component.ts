import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- ✅ import this
import { Web3Service } from '../../../web3/web3.service';

@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- ✅ add CommonModule here
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss'],
})
export class DoctorRegistrationComponent {
  doctorForm: FormGroup;
  passwordMismatch: boolean = false;
  submitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {
    this.doctorForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      hospitalName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      gender: ['', Validators.required],
      nic: ['', Validators.required],
      addressInfo: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  async registerDoctor() {
    if (this.doctorForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formValue = this.doctorForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }

    const doctorData = {
      title: formValue.title,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      hospitalName: formValue.hospitalName,
      registrationNumber: formValue.registrationNumber,
      gender: formValue.gender,
      nic: formValue.nic,
      addressInfo: formValue.addressInfo,
      phone: formValue.phone,
      email: formValue.email,
      specialization: formValue.specialization,
      password: formValue.password,
    };

    console.log('Submitting doctor data to blockchain:', doctorData);

    this.submitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    try {
      const receipt = await this.web3Service.registerDoctor(doctorData);
      console.log('Doctor registered, tx receipt:', receipt);
      this.submissionSuccess = true;
      this.doctorForm.reset();
    } catch (error: any) {
      console.error('Error registering doctor:', error);
      this.submissionError = error.message || 'Failed to register doctor';
    } finally {
      this.submitting = false;
    }
  }
}

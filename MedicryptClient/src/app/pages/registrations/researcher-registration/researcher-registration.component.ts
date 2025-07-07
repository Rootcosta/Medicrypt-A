import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Web3Service } from '../../../web3/web3.service';

@Component({
  selector: 'app-researcher-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './researcher-registration.component.html',
  styleUrls: ['./researcher-registration.component.scss'],
})
export class ResearcherRegistrationComponent {
  researcherForm: FormGroup;
  passwordMismatch: boolean = false;
  submitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {
    this.researcherForm = this.fb.group({
      photo: ['', Validators.required],
      instituteName: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      destination: ['', Validators.required],
      gender: ['', Validators.required],
      nic: ['', Validators.required],
      addressInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      educationQualification: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  async registerResearcher() {
    if (this.researcherForm.invalid) {
      console.warn('Form validation failed');
      return;
    }

    const formValue = this.researcherForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    const researcherData = {
      photo: formValue.photo,
      instituteName: formValue.instituteName,
      title: formValue.title,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      destination: formValue.destination,
      gender: formValue.gender,
      nic: formValue.nic,
      addressInfo: formValue.addressInfo,
      email: formValue.email,
      phone: formValue.phone,
      educationQualification: formValue.educationQualification,
      password: formValue.password,
    };

    this.submitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    try {
      const receipt = await this.web3Service.registerResearcher(researcherData);
      console.log('Researcher registered, tx receipt:', receipt);
      this.submissionSuccess = true;
      this.researcherForm.reset();
    } catch (error: any) {
      console.error('Error registering researcher:', error);
      this.submissionError = error.message || 'Failed to register researcher';
    } finally {
      this.submitting = false;
    }
  }
}

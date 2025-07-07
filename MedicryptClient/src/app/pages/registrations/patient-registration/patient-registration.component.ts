import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../enums/user-role.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Web3Service } from '../../../web3/web3.service';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {
  patientForm!: FormGroup;
  account: string = '';
  submitting = false;
  passwordMismatch = false;

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {}

  async ngOnInit() {
    this.patientForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      nic: ['', Validators.required],
      patientAddress: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emergencyContact: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });

    await this.web3Service.ready();
    this.account = this.web3Service.getDefaultAccount();
  }

  async registerPatient() {
    this.passwordMismatch = false;

    if (this.patientForm.invalid) {
      alert('Please fill the form correctly');
      return;
    }

    const form = this.patientForm.value;

    if (form.password !== form.confirmPassword) {
      this.passwordMismatch = true;
      alert("Passwords don't match");
      return;
    }

    if (!form.termsAccepted) {
      alert('You must accept the Terms of Use & Privacy Policy.');
      return;
    }

    this.submitting = true;
    try {
      // Use role-based contract getter with enum UserRole.Patient
      const contract = this.web3Service.getContractByRole(UserRole.Patient);

      await contract.methods
        .registerPatient(
          form.title,
          form.firstName,
          form.lastName,
          form.gender,
          form.dob,
          form.bloodGroup,
          form.weight,
          form.height,
          form.nic,
          form.patientAddress,
          form.phone,
          form.email,
          form.emergencyContact,
          form.password
        )
        .send({ from: this.account });

      alert('Patient registered successfully');
      this.patientForm.reset();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      this.submitting = false;
    }
  }
}

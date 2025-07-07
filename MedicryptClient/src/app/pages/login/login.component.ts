import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Web3Service } from '../../web3/web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMsg = '';

  userTypes = [
    'Patient',
    'Doctor',
    'pharmacist',
    'Insurance',
    'Laboratory',
    'Hospital',
    'Researcher',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private web3Service: Web3Service
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userType: ['Patient', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }

    this.loading = true;
    const { userType, email, password } = this.loginForm.value;

    try {
      let loggedIn = false;

      switch (userType) {
        case 'Patient':
          loggedIn = await this.web3Service.loginPatient(email, password);
          break;
        case 'Doctor':
          loggedIn = await this.web3Service.loginDoctor(email, password);
          break;
        case 'Hospital':
          loggedIn = await this.web3Service.loginHospital(email, password);
          break;
        case 'Insurance':
          loggedIn = await this.web3Service.loginInsurance(email, password);
          break;
        case 'Laboratory':
          loggedIn = await this.web3Service.loginLaboratory(email, password);
          break;
        case 'Researcher':
          loggedIn = await this.web3Service.loginResearcher(email, password);
          break;
        default:
          this.errorMsg = 'Invalid user type selected.';
          this.loading = false;
          return;
      }

      if (loggedIn) {
        alert(`${userType} login successful!`);
        this.router.navigateByUrl('/');
      } else {
        this.errorMsg = 'Invalid credentials.';
      }
    } catch (error) {
      console.error(error);
      this.errorMsg = 'Login failed due to technical issues.';
    } finally {
      this.loading = false;
    }
  }
}

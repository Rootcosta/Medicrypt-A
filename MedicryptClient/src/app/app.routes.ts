import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RegistrationsComponent } from './pages/registrations/registrations.component';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientDetailsComponent } from './pages/patientDetails/patient-details.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { InsuaranceComponent } from './pages/insuarance/insuarance.component';
import { ResearcherComponent } from './pages/researcher/researcher.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { LoginComponent } from './pages/login/login.component';
import { HospitalRegistrationComponent } from './pages/registrations/hospital-registration/hospital-registration.component';
import { DoctorRegistrationComponent } from './pages/registrations/doctor-registration/doctor-registration.component';
import { InsuranceRegistrationComponent } from './pages/registrations/insurance-registration/insurance-registration.component';
import { PatientRegistrationComponent } from './pages/registrations/patient-registration/patient-registration.component'; // New import
import { LaboratoryRegistrationComponent } from './pages/registrations/laboratory-registration/laboratory-registration.component';
import { ResearcherRegistrationComponent } from './pages/registrations/researcher-registration/researcher-registration.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient-details/:address', component: PatientDetailsComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'hospital', component: HospitalComponent },
  { path: 'laboratory', component: LaboratoryComponent },
  { path: 'insuarance', component: InsuaranceComponent },
  { path: 'researcher', component: ResearcherComponent },
  { path: 'registrations', component: RegistrationsComponent },
  { path: 'hospital-registration', component: HospitalRegistrationComponent },
  { path: 'doctor-registration', component: DoctorRegistrationComponent },
  {
    path: 'insuarance-registration',
    component: InsuranceRegistrationComponent,
  },
  {
    path: 'laboratory-registration',
    component: LaboratoryRegistrationComponent,
  }, // New route
  { path: 'patient-registration', component: PatientRegistrationComponent }, // New route for patient registration
  {
    path: 'researcher-registration',
    component: ResearcherRegistrationComponent,
  }, // New route for researcher registration
  { path: '**', redirectTo: '' },
];

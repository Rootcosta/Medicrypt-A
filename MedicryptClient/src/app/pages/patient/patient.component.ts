import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from '../../web3/web3.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3Service: Web3Service, private router: Router) {}

  async ngOnInit() {
    try {
      await this.web3Service.ready();
      this.patients = await this.web3Service.getAllPatients();
      this.filteredPatients = [...this.patients];
    } catch (err: any) {
      console.error('Error loading patients:', err);
      this.error = err.message || 'Failed to load patients.';
    } finally {
      this.loading = false;
    }
  }

  filterPatients(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPatients = this.patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchTerm) ||
        patient.lastName.toLowerCase().includes(searchTerm) ||
        patient.gender.toLowerCase().includes(searchTerm)
    );
  }

  viewPatient(address: string) {
    if (!address) {
      console.error('Invalid patient address:', address);
      return;
    }
    this.router.navigate(['/patient-details', address]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from '../../web3/web3.service'; // adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3Service: Web3Service, private router: Router) {}

  async ngOnInit() {
    try {
      await this.web3Service.ready();
      this.doctors = await this.web3Service.getAllDoctors();
      console.log(this.doctors);
      this.filteredDoctors = [...this.doctors];
    } catch (error: any) {
      console.error('Error loading doctors:', error);
      this.error = error.message || 'Failed to load doctors.';
    } finally {
      this.loading = false;
    }
  }

  filterDoctors(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDoctors = this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm) ||
        (doctor.specialty &&
          doctor.specialty.toLowerCase().includes(searchTerm)) ||
        (doctor.branch && doctor.branch.toLowerCase().includes(searchTerm))
    );
  }

  viewDoctor(address: string) {
    this.router.navigate(['/doctor-details', address]);
  }
}

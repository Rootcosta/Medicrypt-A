import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3/web3.service'; // adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  hospitals: any[] = [];
  filteredHospitals: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    try {
      await this.web3.ready(); // wait for web3 and contract to initialize
      this.hospitals = await this.web3.getAllHospitals();
      console.log(this.hospitals);
      this.filteredHospitals = [...this.hospitals];
    } catch (error: any) {
      console.error('Error loading hospitals:', error);
      this.error = error.message || 'Failed to load hospitals.';
    } finally {
      this.loading = false;
    }
  }

  filterHospitals(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredHospitals = this.hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm) ||
        hospital.branch.toLowerCase().includes(searchTerm) ||
        hospital.hospitalType.toLowerCase().includes(searchTerm)
    );
  }
}

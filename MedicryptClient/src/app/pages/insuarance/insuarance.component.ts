import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3/web3.service';

@Component({
  selector: 'app-insuarance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insuarance.component.html',
  styleUrls: ['./insuarance.component.scss'],
})
export class InsuaranceComponent implements OnInit {
  insuranceCompanies: any[] = [];
  filteredCompanies: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    try {
      await this.web3.ready();
      this.insuranceCompanies = await this.web3.getAllInsurances(); // implement in Web3Service
      this.filteredCompanies = [...this.insuranceCompanies];
      console.log('Insurance Companies:', this.insuranceCompanies);
    } catch (error: any) {
      console.error('Error loading insurance companies:', error);
      this.error = error.message || 'Failed to load insurance companies.';
    } finally {
      this.loading = false;
    }
  }

  filterCompanies(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCompanies = this.insuranceCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm)
    );
  }
}

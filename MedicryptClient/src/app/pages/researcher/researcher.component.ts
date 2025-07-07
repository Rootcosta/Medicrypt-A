import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3/web3.service';

@Component({
  selector: 'app-researcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.scss'],
})
export class ResearcherComponent implements OnInit {
  researchers: any[] = [];
  filteredResearchers: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3Service: Web3Service) {}

  async ngOnInit() {
    try {
      await this.web3Service.ready();
      this.researchers = await this.web3Service.getAllResearchers(); // implement in Web3Service
      this.filteredResearchers = [...this.researchers];
      console.log(this.researchers);
    } catch (err: any) {
      console.error('Error loading researchers:', err);
      this.error = err.message || 'Failed to load researchers.';
    } finally {
      this.loading = false;
    }
  }

  filterResearchers(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredResearchers = this.researchers.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm) ||
        r.institution?.toLowerCase().includes(searchTerm) ||
        r.fieldOfStudy?.toLowerCase().includes(searchTerm)
    );
  }
}

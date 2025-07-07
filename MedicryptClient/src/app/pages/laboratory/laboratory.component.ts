import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3/web3.service';

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss'],
})
export class LaboratoryComponent implements OnInit {
  laboratories: any[] = [];
  filteredLaboratories: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    try {
      await this.web3.ready();
      this.laboratories = await this.web3.getAllLaboratories(); // implement this in Web3Service
      this.filteredLaboratories = [...this.laboratories];
      console.log('Labs:', this.laboratories);
    } catch (err: any) {
      console.error('Error loading labs:', err);
      this.error = err.message || 'Failed to load laboratories.';
    } finally {
      this.loading = false;
    }
  }

  filterLaboratories(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredLaboratories = this.laboratories.filter(
      (lab) =>
        lab.name.toLowerCase().includes(searchTerm) ||
        lab.branch.toLowerCase().includes(searchTerm)
    );
  }
}

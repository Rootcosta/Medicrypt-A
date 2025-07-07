import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from '../../web3/web3.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  patientAddress!: string;
  patient: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web3Service: Web3Service
  ) {}

  async ngOnInit() {
    this.patientAddress = this.route.snapshot.paramMap.get('address') || '';
    if (this.patientAddress) {
      await this.web3Service.ready();
      this.patient = await this.web3Service.getPatientByAddress(
        this.patientAddress
      );
    }
  }

  goBack() {
    this.router.navigate(['/patients']);
  }
}

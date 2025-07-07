import { Injectable } from '@angular/core';
import Web3 from 'web3';

import hospitalAbi from '../../../../blockchain/build/contracts/HospitalRegistry.json';
import patientAbi from '../../../../blockchain/build/contracts/PatientRegistry.json';
import doctorAbi from '../../../../blockchain/build/contracts/DoctorRegistry.json';
import insuranceAbi from '../../../../blockchain/build/contracts/InsuranceRegistry.json';
import laboratoryAbi from '../../../../blockchain/build/contracts/LaboratoryRegistry.json';
import researcherAbi from '../../../../blockchain/build/contracts/ResearcherRegistry.json';

import { environment } from './config';
import { UserRole } from '../enums/user-role.enum';

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private web3!: Web3;
  private accounts: string[] = [];
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  private hospitalContract!: any;
  private patientContract!: any;
  private doctorContract!: any;
  private insuranceContract!: any;
  private laboratoryContract!: any;
  private researcherContract!: any;

  constructor() {
    this.initPromise = this.initWeb3();
  }

  private async initWeb3(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.accounts = await this.web3.eth.getAccounts();
      if (!this.accounts.length) {
        this.accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
      }
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('MetaMask account changed:', accounts);
        this.accounts = accounts;
      });
    } else {
      this.web3 = new Web3('http://localhost:8545');
      this.accounts = await this.web3.eth.getAccounts();
    }

    this.hospitalContract = new this.web3.eth.Contract(
      hospitalAbi.abi,
      environment.hospitalContractAddress
    );
    this.patientContract = new this.web3.eth.Contract(
      patientAbi.abi,
      environment.patientContractAddress
    );
    this.doctorContract = new this.web3.eth.Contract(
      doctorAbi.abi,
      environment.doctorContractAddress
    );
    this.insuranceContract = new this.web3.eth.Contract(
      insuranceAbi.abi,
      environment.insuranceContractAddress
    );
    this.laboratoryContract = new this.web3.eth.Contract(
      laboratoryAbi.abi,
      environment.laboratoryContractAddress
    );
    this.researcherContract = new this.web3.eth.Contract(
      researcherAbi.abi,
      environment.researcherContractAddress
    );
  }

  public async ready(): Promise<void> {
    if (this.initPromise) {
      await this.initPromise;
    }
  }

  public getDefaultAccount(): string {
    return this.accounts[0];
  }

  // ---------- REGISTER METHODS ------------

  async registerHospital(data: any): Promise<any> {
    await this.ready();
    return this.hospitalContract.methods
      .registerHospital(
        data.name,
        data.regNumber,
        data.hospitalType,
        data.branch,
        data.addressInfo,
        data.email,
        data.phone,
        data.website,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  async registerPatient(data: any): Promise<any> {
    await this.ready();
    return this.patientContract.methods
      .registerPatient(
        data.title,
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        data.bloodGroup,
        data.weight,
        data.height,
        data.nic,
        data.patientAddress,
        data.phone,
        data.email,
        data.emergencyContact,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  async registerDoctor(data: any): Promise<any> {
    await this.ready();
    return this.doctorContract.methods
      .registerDoctor(
        data.title,
        data.firstName,
        data.lastName,
        data.hospitalName,
        data.registrationNumber,
        data.gender,
        data.nic,
        data.addressInfo,
        data.email,
        data.phone,
        data.specialization,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  async registerInsurance(data: any): Promise<any> {
    await this.ready();
    return this.insuranceContract.methods
      .registerInsurance(
        data.insuranceName,
        data.title,
        data.firstName,
        data.lastName,
        data.registrationNumber,
        data.insuranceType,
        data.addressInfo,
        data.email,
        data.phone,
        data.branch,
        data.insuranceCover,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  async registerLaboratory(data: any): Promise<any> {
    await this.ready();
    return this.laboratoryContract.methods
      .registerLaboratory(
        data.photo,
        data.labName,
        data.title,
        data.firstName,
        data.lastName,
        data.registrationNumber,
        data.referredHospital,
        data.addressInfo,
        data.email,
        data.phone,
        data.branch,
        data.website,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  async registerResearcher(data: any): Promise<any> {
    await this.ready();
    return this.researcherContract.methods
      .registerResearcher(
        data.photo,
        data.instituteName,
        data.title,
        data.firstName,
        data.lastName,
        data.destination,
        data.gender,
        data.nic,
        data.addressInfo,
        data.email,
        data.phone,
        data.educationQualification,
        data.password
      )
      .send({ from: this.accounts[0] });
  }

  // --------- LOGIN METHODS -----------

  async loginHospital(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.hospitalContract.methods
        .loginHospital(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Hospital login error:', e);
      return false;
    }
  }

  async loginPatient(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.patientContract.methods
        .loginPatient(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Patient login error:', e);
      return false;
    }
  }

  async loginDoctor(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.doctorContract.methods
        .loginDoctor(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Doctor login error:', e);
      return false;
    }
  }

  async loginInsurance(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.insuranceContract.methods
        .loginInsurance(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Insurance login error:', e);
      return false;
    }
  }

  async loginLaboratory(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.laboratoryContract.methods
        .loginLaboratory(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Laboratory login error:', e);
      return false;
    }
  }

  async loginResearcher(email: string, password: string): Promise<boolean> {
    await this.ready();
    try {
      return await this.researcherContract.methods
        .loginResearcher(email, password)
        .call({ from: this.accounts[0] });
    } catch (e) {
      console.error('Researcher login error:', e);
      return false;
    }
  }

  // ---------- FETCH USER BY ADDRESS ------------

  async getHospitalByAddress(address: string): Promise<any> {
    await this.ready();
    const h = await this.hospitalContract.methods
      .getHospitalByAddress(address)
      .call();
    return {
      name: h[0],
      regNumber: h[1],
      hospitalType: h[2],
      branch: h[3],
      addressInfo: h[4],
      email: h[5],
      phone: h[6],
      website: h[7],
      isRegistered: h[8],
    };
  }

  async getPatientByAddress(address: string): Promise<any> {
    await this.ready();
    const p = await this.patientContract.methods
      .getPatientByAddress(address)
      .call();
    return {
      title: p[0],
      firstName: p[1],
      lastName: p[2],
      gender: p[3],
      dob: p[4],
      bloodGroup: p[5],
      weight: p[6],
      height: p[7],
      nic: p[8],
      patientAddress: p[9],
      phone: p[10],
      email: p[11],
      emergencyContact: p[12],
      isRegistered: p[13],
    };
  }

  async getDoctorByAddress(address: string): Promise<any> {
    await this.ready();
    const d = await this.doctorContract.methods
      .getDoctorByAddress(address)
      .call();
    return {
      title: d[0],
      firstName: d[1],
      lastName: d[2],
      hospitalName: d[3],
      registrationNumber: d[4],
      gender: d[5],
      nic: d[6],
      addressInfo: d[7],
      email: d[8],
      phone: d[9],
      specialization: d[10],
      isRegistered: d[11],
    };
  }

  async getInsuranceByAddress(address: string): Promise<any> {
    await this.ready();
    const i = await this.insuranceContract.methods
      .getInsuranceByAddress(address)
      .call();
    return {
      insuranceName: i[0],
      title: i[1],
      firstName: i[2],
      lastName: i[3],
      registrationNumber: i[4],
      insuranceType: i[5],
      addressInfo: i[6],
      email: i[7],
      phone: i[8],
      branch: i[9],
      cover: i[10],
      isRegistered: i[11],
    };
  }

  async getLaboratoryByAddress(address: string): Promise<any> {
    await this.ready();
    const l = await this.laboratoryContract.methods
      .getLaboratoryByAddress(address)
      .call();
    return {
      photo: l[0],
      labName: l[1],
      title: l[2],
      firstName: l[3],
      lastName: l[4],
      registrationNumber: l[5],
      referredHospital: l[6],
      addressInfo: l[7],
      email: l[8],
      phone: l[9],
      branch: l[10],
      website: l[11],
      isRegistered: l[12],
    };
  }

  async getResearcherByAddress(address: string): Promise<any> {
    await this.ready();
    const r = await this.researcherContract.methods
      .getResearcherByAddress(address)
      .call();
    return {
      photo: r[0],
      instituteName: r[1],
      title: r[2],
      firstName: r[3],
      lastName: r[4],
      destination: r[5],
      gender: r[6],
      nic: r[7],
      addressInfo: r[8],
      email: r[9],
      phone: r[10],
      educationQualification: r[11],
      isRegistered: r[12],
    };
  }

  // ----------- ROLE DETECTION -------------

  async getUserRole(address: string): Promise<UserRole> {
    await this.ready();

    try {
      const isHospital = await this.hospitalContract.methods
        .isHospitalRegistered(address)
        .call();
      if (isHospital) return UserRole.Hospital;

      const isPatient = await this.patientContract.methods
        .isPatientRegistered(address)
        .call();
      if (isPatient) return UserRole.Patient;

      const isDoctor = await this.doctorContract.methods
        .isDoctorRegistered(address)
        .call();
      if (isDoctor) return UserRole.Doctor;

      const isInsurance = await this.insuranceContract.methods
        .isInsuranceRegistered(address)
        .call();
      if (isInsurance) return UserRole.Insurance;

      const isLaboratory = await this.laboratoryContract.methods
        .isLaboratoryRegistered(address)
        .call();
      if (isLaboratory) return UserRole.Laboratory;

      const isResearcher = await this.researcherContract.methods
        .isResearcherRegistered(address)
        .call();
      if (isResearcher) return UserRole.Researcher;
    } catch (e) {
      console.error('Role detection error:', e);
    }

    return UserRole.Unknown;
  }
  // Inside Web3Service class

  // Get contract instance by user role
  public getContractByRole(role: UserRole): any {
    switch (role) {
      case UserRole.Hospital:
        return this.hospitalContract;
      case UserRole.Patient:
        return this.patientContract;
      case UserRole.Doctor:
        return this.doctorContract;
      case UserRole.Insurance:
        return this.insuranceContract;
      case UserRole.Laboratory:
        return this.laboratoryContract;
      case UserRole.Researcher:
        return this.researcherContract;
      default:
        throw new Error(`Unknown user role: ${role}`);
    }
  }

  // Fetch all registered entities by role

  async getAllHospitals(): Promise<any[]> {
    await this.ready();
    const addresses: string[] = await this.hospitalContract.methods
      .getAllHospitals()
      .call();

    const hospitals = [];
    for (const addr of addresses) {
      const hospitalData = await this.hospitalContract.methods
        .getHospitalByAddress(addr)
        .call();
      hospitals.push({
        address: addr,
        name: hospitalData[0],
        regNumber: hospitalData[1],
        hospitalType: hospitalData[2],
        addressInfo: hospitalData[3],
        email: hospitalData[4],
        phone: hospitalData[5],
        branch: hospitalData[6],
        website: hospitalData[7],
        isRegistered: hospitalData[8],
      });
    }

    return hospitals;
  }

  async getAllPatients(): Promise<any[]> {
    const addresses: string[] = await this.patientContract.methods
      .getAllPatients()
      .call();

    const patients = [];

    for (const addr of addresses) {
      const patientData = await this.patientContract.methods
        .getPatientByAddress(addr)
        .call();

      patients.push({
        address: addr,
        title: patientData[0],
        firstName: patientData[1],
        lastName: patientData[2],
        gender: patientData[3],
        dob: patientData[4],
        bloodGroup: patientData[5],
        weight: Number(patientData[6]),
        height: Number(patientData[7]),
        nic: patientData[8],
        patientAddress: patientData[9],
        phone: patientData[10],
        email: patientData[11],
        emergencyContact: patientData[12],
        isRegistered: patientData[13],
      });
    }

    return patients;
  }

  async getAllDoctors(): Promise<any[]> {
    await this.ready();
    const addresses: string[] = await this.doctorContract.methods
      .getAllDoctors()
      .call();

    const doctors = [];
    for (const addr of addresses) {
      const doctorData = await this.doctorContract.methods
        .getDoctorByAddress(addr)
        .call();
      doctors.push({
        address: addr,
        title: doctorData[0],
        firstName: doctorData[1],
        lastName: doctorData[2],
        hospitalName: doctorData[3],
        registrationNumber: doctorData[4],
        gender: doctorData[5],
        nic: doctorData[6],
        addressInfo: doctorData[7],
        phone: doctorData[8],
        email: doctorData[9],
        specialization: doctorData[10],
        isRegistered: doctorData[11],
      });
    }

    return doctors;
  }

  async getAllInsurances(): Promise<any[]> {
    await this.ready();
    const addresses: string[] = await this.insuranceContract.methods
      .getAllInsurances()
      .call();

    const insurances = [];
    for (const addr of addresses) {
      const insuranceData = await this.insuranceContract.methods
        .getInsuranceByAddress(addr)
        .call();
      insurances.push({
        address: addr,
        insuranceName: insuranceData[0],
        title: insuranceData[1],
        firstName: insuranceData[2],
        lastName: insuranceData[3],
        registrationNumber: insuranceData[4],
        insuranceType: insuranceData[5],
        addressInfo: insuranceData[6],
        email: insuranceData[7],
        phone: insuranceData[8],
        branch: insuranceData[9],
        insuranceCover: insuranceData[10],
        isRegistered: insuranceData[11],
      });
    }

    return insurances;
  }

  async getAllLaboratories(): Promise<any[]> {
    await this.ready();
    const addresses: string[] = await this.laboratoryContract.methods
      .getAllLaboratories()
      .call();

    const labs = [];
    for (const addr of addresses) {
      const labData = await this.laboratoryContract.methods
        .getLaboratoryByAddress(addr)
        .call();
      labs.push({
        address: addr,
        photo: labData[0],
        labName: labData[1],
        title: labData[2],
        firstName: labData[3],
        lastName: labData[4],
        registrationNumber: labData[5],
        referredHospital: labData[6],
        addressInfo: labData[7],
        email: labData[8],
        phone: labData[9],
        branch: labData[10],
        website: labData[11],
        isRegistered: labData[12],
      });
    }

    return labs;
  }

  async getAllResearchers(): Promise<any[]> {
    await this.ready();
    const addresses: string[] = await this.researcherContract.methods
      .getAllResearchers()
      .call();

    const researchers = [];
    for (const addr of addresses) {
      const researcherData = await this.researcherContract.methods
        .getResearcherByAddress(addr)
        .call();
      researchers.push({
        address: addr,
        photo: researcherData[0],
        instituteName: researcherData[1],
        title: researcherData[2],
        firstName: researcherData[3],
        lastName: researcherData[4],
        destination: researcherData[5],
        gender: researcherData[6],
        nic: researcherData[7],
        addressInfo: researcherData[8],
        email: researcherData[9],
        phone: researcherData[10],
        educationQualification: researcherData[11],
        isRegistered: researcherData[12],
      });
    }

    return researchers;
  }
}

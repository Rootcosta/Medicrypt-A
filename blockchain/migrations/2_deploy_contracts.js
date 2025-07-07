const HospitalRegistry = artifacts.require("HospitalRegistry");
const PatientRegistry = artifacts.require("PatientRegistry");
const DoctorRegistry = artifacts.require("DoctorRegistry");
const InsuranceRegistry = artifacts.require("InsuranceRegistry");
const LaboratoryRegistry = artifacts.require("LaboratoryRegistry");
const ResearcherRegistry = artifacts.require("ResearcherRegistry");

module.exports = function (deployer) {
  deployer.deploy(HospitalRegistry);
  deployer.deploy(PatientRegistry);
  deployer.deploy(DoctorRegistry);
  deployer.deploy(InsuranceRegistry);
  deployer.deploy(LaboratoryRegistry);
  deployer.deploy(ResearcherRegistry);
};

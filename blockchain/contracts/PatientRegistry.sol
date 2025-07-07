// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistry {
    struct Patient {
        string title;
        string firstName;
        string lastName;
        string gender;
        string dob; // Date of Birth as string (e.g., "YYYY-MM-DD")
        string bloodGroup;
        uint256 weight; // store weight as integer (kg)
        uint256 height; // store height as integer (cm)
        string nic; // National ID card number
        string patientAddress; // Residential address
        string phone;
        string email;
        string emergencyContact;
        bytes32 passwordHash; // store hash of password
        bool isRegistered;
    }

    mapping(address => Patient) private patients;
    address[] private patientAddresses;

    event PatientRegistered(
        address indexed patientAddress,
        string firstName,
        string lastName
    );

    function registerPatient(
        string memory _title,
        string memory _firstName,
        string memory _lastName,
        string memory _gender,
        string memory _dob,
        string memory _bloodGroup,
        uint256 _weight,
        uint256 _height,
        string memory _nic,
        string memory _patientAddress,
        string memory _phone,
        string memory _email,
        string memory _emergencyContact,
        string memory _password
    ) public {
        require(
            !patients[msg.sender].isRegistered,
            "Patient already registered"
        );

        patients[msg.sender] = Patient({
            title: _title,
            firstName: _firstName,
            lastName: _lastName,
            gender: _gender,
            dob: _dob,
            bloodGroup: _bloodGroup,
            weight: _weight,
            height: _height,
            nic: _nic,
            patientAddress: _patientAddress,
            phone: _phone,
            email: _email,
            emergencyContact: _emergencyContact,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        patientAddresses.push(msg.sender);
        emit PatientRegistered(msg.sender, _firstName, _lastName);
    }

    function loginPatient(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(patients[msg.sender].isRegistered, "Patient not registered");

        bool emailMatches = keccak256(
            abi.encodePacked(patients[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = patients[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getPatientByAddress(
        address _addr
    )
        public
        view
        returns (
            string memory title,
            string memory firstName,
            string memory lastName,
            string memory gender,
            string memory dob,
            string memory bloodGroup,
            uint256 weight,
            uint256 height,
            string memory nic,
            string memory patientAddress,
            string memory phone,
            string memory email,
            string memory emergencyContact,
            bool isRegistered
        )
    {
        Patient memory p = patients[_addr];
        return (
            p.title,
            p.firstName,
            p.lastName,
            p.gender,
            p.dob,
            p.bloodGroup,
            p.weight,
            p.height,
            p.nic,
            p.patientAddress,
            p.phone,
            p.email,
            p.emergencyContact,
            p.isRegistered
        );
    }

    function isPatientRegistered(address _addr) public view returns (bool) {
        return patients[_addr].isRegistered;
    }

    function getAllPatients() public view returns (address[] memory) {
        return patientAddresses;
    }
}

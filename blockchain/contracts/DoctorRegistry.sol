// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistry {
    struct Doctor {
        string title;
        string firstName;
        string lastName;
        string hospitalName;
        string registrationNumber;
        string gender;
        string nic;
        string addressInfo;
        string phone;
        string email;
        string specialization;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => Doctor) private doctors;
    address[] private doctorAddresses;

    event DoctorRegistered(
        address indexed doctorAddress,
        string firstName,
        string lastName
    );

    function registerDoctor(
        string memory _title,
        string memory _firstName,
        string memory _lastName,
        string memory _hospitalName,
        string memory _registrationNumber,
        string memory _gender,
        string memory _nic,
        string memory _addressInfo,
        string memory _phone,
        string memory _email,
        string memory _specialization,
        string memory _password
    ) public {
        require(!doctors[msg.sender].isRegistered, "Doctor already registered");

        doctors[msg.sender] = Doctor({
            title: _title,
            firstName: _firstName,
            lastName: _lastName,
            hospitalName: _hospitalName,
            registrationNumber: _registrationNumber,
            gender: _gender,
            nic: _nic,
            addressInfo: _addressInfo,
            phone: _phone,
            email: _email,
            specialization: _specialization,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        doctorAddresses.push(msg.sender);
        emit DoctorRegistered(msg.sender, _firstName, _lastName);
    }

    function loginDoctor(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(doctors[msg.sender].isRegistered, "Doctor not registered");

        bool emailMatches = keccak256(
            abi.encodePacked(doctors[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = doctors[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getDoctorByAddress(
        address _addr
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        Doctor memory d = doctors[_addr];
        return (
            d.title,
            d.firstName,
            d.lastName,
            d.hospitalName,
            d.registrationNumber,
            d.gender,
            d.nic,
            d.addressInfo,
            d.phone,
            d.email,
            d.specialization,
            d.isRegistered
        );
    }

    function isDoctorRegistered(address _addr) public view returns (bool) {
        return doctors[_addr].isRegistered;
    }

    function getAllDoctors() public view returns (address[] memory) {
        return doctorAddresses;
    }
}

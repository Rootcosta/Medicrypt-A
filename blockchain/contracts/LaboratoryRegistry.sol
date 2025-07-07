// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaboratoryRegistry {
    struct Laboratory {
        string photo;
        string labName;
        string title;
        string firstName;
        string lastName;
        string registrationNumber;
        string referredHospital;
        string addressInfo;
        string email;
        string phone;
        string branch;
        string website;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => Laboratory) private laboratories;
    address[] private laboratoryAddresses;

    event LaboratoryRegistered(address indexed labAddress, string labName);

    function registerLaboratory(
        string memory _photo,
        string memory _labName,
        string memory _title,
        string memory _firstName,
        string memory _lastName,
        string memory _registrationNumber,
        string memory _referredHospital,
        string memory _addressInfo,
        string memory _email,
        string memory _phone,
        string memory _branch,
        string memory _website,
        string memory _password
    ) public {
        require(
            !laboratories[msg.sender].isRegistered,
            "Lab already registered"
        );

        laboratories[msg.sender] = Laboratory({
            photo: _photo,
            labName: _labName,
            title: _title,
            firstName: _firstName,
            lastName: _lastName,
            registrationNumber: _registrationNumber,
            referredHospital: _referredHospital,
            addressInfo: _addressInfo,
            email: _email,
            phone: _phone,
            branch: _branch,
            website: _website,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        laboratoryAddresses.push(msg.sender);
        emit LaboratoryRegistered(msg.sender, _labName);
    }

    function loginLaboratory(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(laboratories[msg.sender].isRegistered, "Lab not registered");

        bool emailMatches = keccak256(
            abi.encodePacked(laboratories[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = laboratories[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getLaboratoryByAddress(
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
            string memory,
            bool
        )
    {
        Laboratory memory l = laboratories[_addr];
        return (
            l.photo,
            l.labName,
            l.title,
            l.firstName,
            l.lastName,
            l.registrationNumber,
            l.referredHospital,
            l.addressInfo,
            l.email,
            l.phone,
            l.branch,
            l.website,
            l.isRegistered
        );
    }

    function isLaboratoryRegistered(address _addr) public view returns (bool) {
        return laboratories[_addr].isRegistered;
    }

    function getAllLaboratories() public view returns (address[] memory) {
        return laboratoryAddresses;
    }
}

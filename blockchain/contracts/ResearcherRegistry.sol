// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResearcherRegistry {
    struct Researcher {
        string photo;
        string instituteName;
        string title;
        string firstName;
        string lastName;
        string destination;
        string gender;
        string nic;
        string addressInfo;
        string email;
        string phone;
        string educationQualification;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => Researcher) private researchers;
    address[] private researcherAddresses;

    event ResearcherRegistered(
        address indexed researcherAddress,
        string firstName,
        string lastName
    );

    function registerResearcher(
        string memory _photo,
        string memory _instituteName,
        string memory _title,
        string memory _firstName,
        string memory _lastName,
        string memory _destination,
        string memory _gender,
        string memory _nic,
        string memory _addressInfo,
        string memory _email,
        string memory _phone,
        string memory _educationQualification,
        string memory _password
    ) public {
        require(
            !researchers[msg.sender].isRegistered,
            "Researcher already registered"
        );

        researchers[msg.sender] = Researcher({
            photo: _photo,
            instituteName: _instituteName,
            title: _title,
            firstName: _firstName,
            lastName: _lastName,
            destination: _destination,
            gender: _gender,
            nic: _nic,
            addressInfo: _addressInfo,
            email: _email,
            phone: _phone,
            educationQualification: _educationQualification,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        researcherAddresses.push(msg.sender);
        emit ResearcherRegistered(msg.sender, _firstName, _lastName);
    }

    function loginResearcher(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(
            researchers[msg.sender].isRegistered,
            "Researcher not registered"
        );

        bool emailMatches = keccak256(
            abi.encodePacked(researchers[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = researchers[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getResearcherByAddress(
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
        Researcher memory r = researchers[_addr];
        return (
            r.photo,
            r.instituteName,
            r.title,
            r.firstName,
            r.lastName,
            r.destination,
            r.gender,
            r.nic,
            r.addressInfo,
            r.email,
            r.phone,
            r.educationQualification,
            r.isRegistered
        );
    }

    function isResearcherRegistered(address _addr) public view returns (bool) {
        return researchers[_addr].isRegistered;
    }

    function getAllResearchers() public view returns (address[] memory) {
        return researcherAddresses;
    }
}

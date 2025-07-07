// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceRegistry {
    struct InsuranceProvider {
        string insuranceName;
        string title;
        string firstName;
        string lastName;
        string registrationNumber;
        string insuranceType;
        string addressInfo;
        string phone;
        string email;
        string branch;
        string insuranceCover;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => InsuranceProvider) private providers;
    address[] private providerAddresses;

    event InsuranceRegistered(
        address indexed insuranceAddress,
        string insuranceName
    );

    function registerInsurance(
        string memory _insuranceName,
        string memory _title,
        string memory _firstName,
        string memory _lastName,
        string memory _registrationNumber,
        string memory _insuranceType,
        string memory _addressInfo,
        string memory _phone,
        string memory _email,
        string memory _branch,
        string memory _insuranceCover,
        string memory _password
    ) public {
        require(
            !providers[msg.sender].isRegistered,
            "Insurance already registered"
        );

        providers[msg.sender] = InsuranceProvider({
            insuranceName: _insuranceName,
            title: _title,
            firstName: _firstName,
            lastName: _lastName,
            registrationNumber: _registrationNumber,
            insuranceType: _insuranceType,
            addressInfo: _addressInfo,
            phone: _phone,
            email: _email,
            branch: _branch,
            insuranceCover: _insuranceCover,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        providerAddresses.push(msg.sender);
        emit InsuranceRegistered(msg.sender, _insuranceName);
    }

    function loginInsurance(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(providers[msg.sender].isRegistered, "Insurance not registered");

        bool emailMatches = keccak256(
            abi.encodePacked(providers[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = providers[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getInsuranceByAddress(
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
        InsuranceProvider memory i = providers[_addr];
        return (
            i.insuranceName,
            i.title,
            i.firstName,
            i.lastName,
            i.registrationNumber,
            i.insuranceType,
            i.addressInfo,
            i.phone,
            i.email,
            i.branch,
            i.insuranceCover,
            i.isRegistered
        );
    }

    function isInsuranceRegistered(address _addr) public view returns (bool) {
        return providers[_addr].isRegistered;
    }

    function getAllInsurances() public view returns (address[] memory) {
        return providerAddresses;
    }
}

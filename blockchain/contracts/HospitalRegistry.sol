// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalRegistry {
    struct Hospital {
        string name;
        string regNumber;
        string hospitalType;
        string addressInfo;
        string email;
        string phone;
        string branch;
        string website;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => Hospital) private hospitals;
    address[] private hospitalAddresses;

    event HospitalRegistered(address indexed hospitalAddress, string name);

    function registerHospital(
        string memory _name,
        string memory _regNumber,
        string memory _hospitalType,
        string memory _addressInfo,
        string memory _email,
        string memory _phone,
        string memory _branch,
        string memory _website,
        string memory _password
    ) public {
        require(
            !hospitals[msg.sender].isRegistered,
            "Hospital already registered"
        );

        hospitals[msg.sender] = Hospital({
            name: _name,
            regNumber: _regNumber,
            hospitalType: _hospitalType,
            addressInfo: _addressInfo,
            email: _email,
            phone: _phone,
            branch: _branch,
            website: _website,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        hospitalAddresses.push(msg.sender);
        emit HospitalRegistered(msg.sender, _name);
    }

    function loginHospital(
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        require(hospitals[msg.sender].isRegistered, "Hospital not registered");

        bool emailMatches = keccak256(
            abi.encodePacked(hospitals[msg.sender].email)
        ) == keccak256(abi.encodePacked(_email));
        bool passwordMatches = hospitals[msg.sender].passwordHash ==
            keccak256(abi.encodePacked(_password));

        return emailMatches && passwordMatches;
    }

    function getHospitalByAddress(
        address _addr
    )
        public
        view
        returns (
            string memory name,
            string memory regNumber,
            string memory hospitalType,
            string memory addressInfo,
            string memory email,
            string memory phone,
            string memory branch,
            string memory website,
            bool isRegistered
        )
    {
        Hospital memory h = hospitals[_addr];
        return (
            h.name,
            h.regNumber,
            h.hospitalType,
            h.addressInfo,
            h.email,
            h.phone,
            h.branch,
            h.website,
            h.isRegistered
        );
    }

    function isHospitalRegistered(address _addr) public view returns (bool) {
        return hospitals[_addr].isRegistered;
    }

    function getAllHospitals() public view returns (address[] memory) {
        return hospitalAddresses;
    }
}

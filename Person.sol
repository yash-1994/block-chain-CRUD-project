// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Person {
    struct PersonRecord {
        string name;
        uint256 age;
    }

    mapping(uint256 => PersonRecord) public people;
    uint256 public nextPersonId = 1;

    event PersonDeleted(uint256 indexed personId, string name, uint256 age);

    function createPerson(string memory _name, uint256 _age) public {
        people[nextPersonId] = PersonRecord(_name, _age);
        nextPersonId++;
    }

    function updatePerson(uint256 _personId, string memory _newName, uint256 _newAge) public {
        require(_personId >= 1 && _personId < nextPersonId, "Person does not exist");
        people[_personId].name = _newName;
        people[_personId].age = _newAge;
    }

    function getPersonRecord(uint256 _personId) public view returns (string memory, uint256) {
        require(_personId >= 1 && _personId < nextPersonId, "Person does not exist");
        return (people[_personId].name, people[_personId].age);
    }

    function deletePerson(uint256 _personId) public {
        require(_personId >= 1 && _personId < nextPersonId, "Person does not exist");

        // Emit an event before deleting the person's record
        emit PersonDeleted(_personId, people[_personId].name, people[_personId].age);

        // Delete the person's record
        delete people[_personId];
    }

    function getAllPersonRecords() public view returns (PersonRecord[] memory) {
        PersonRecord[] memory records = new PersonRecord[](nextPersonId - 1);

        for (uint256 i = 1; i < nextPersonId; i++) {
            records[i - 1] = people[i];
        }
        return records;
    }

    function deleteAllRecords() public {
        for (uint256 i = 1; i < nextPersonId; i++) {
            delete people[i];
        }
        nextPersonId = 1;
    }
}

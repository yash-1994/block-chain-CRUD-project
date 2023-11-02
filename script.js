import { ethers } from "./ethers-5.6.esm.min.js";


let RPC_URL="http://127.0.0.1:7545" //GANACHE RCP URL
let PRIVATE_KEY="0x148f01b6438d2a34bd393120ef66ed00e4345bf715eb45706b4f1b204f2d0805" 
let CONTRACT_ADDRESS="0x8a131bBdC42edc4e455C4Fd3EA58BE6761EE9094"   //CHANGE IT BEFORE RUN THE PROJECT

let contract;

//* STEP 1
console.log("Step 1 varified");

try {
    const contractAddress = CONTRACT_ADDRESS;
    const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "personId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "PersonDeleted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_age",
                    "type": "uint256"
                }
            ],
            "name": "createPerson",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deleteAllRecords",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_personId",
                    "type": "uint256"
                }
            ],
            "name": "deletePerson",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllPersonRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "age",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Person.PersonRecord[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_personId",
                    "type": "uint256"
                }
            ],
            "name": "getPersonRecord",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextPersonId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "people",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_personId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_newName",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_newAge",
                    "type": "uint256"
                }
            ],
            "name": "updatePerson",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
 
    const privateKey = PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(contractAddress, contractABI, wallet);
} catch (err) {
    console.log("started code error:- " + err);
}

//* STEP 2
console.log("Step 2 varified");

//! -->> CRUD FUNCTIONS

async function createPerson(name, age) {
    try {
        const tx = await contract.createPerson(name, age);
        const receipt = await tx.wait();
        console.log("Person created successfully!");
    } catch (error) {
        console.error("Error creating person: ", error);
    }
}

async function getPersonRecord(personIdToRetrieve) {
    try {
        let result = await contract.getPersonRecord(personIdToRetrieve);

        const [age, name] = result;

        if (age != 0 && name.length != 0) {
            return result;
        } else {
            return;
        }
    } catch (error) {

    }
}

async function getAllPersonRecords() {
    try {
        const records = await contract.getAllPersonRecords();
        const personRecords = [];
        if (records.length === 0) {
            console.log("No person records found. The array is empty.");
        } else {
            records.forEach((record, index) => {
                const [name, age] = record;
                if (name.length !== 0 && age !== 0) {
                    const personRecord = {
                        personID: index + 1,
                        name: name,
                        age: age,
                    };
                    personRecords.push(personRecord);
                }
            });
        }

        return personRecords;
    } catch (error) {
        console.error("Error retrieving all person records:", error);
    }
}

async function deletePersonRecord(ID) {
    try {
        const result = contract.deletePerson(ID);
        console.log("Deleted Sussceefully!!");
    } catch (err) {
        console.error("Error deleting person records:", err);
    }
}

async function clearPersonRecords() {
    try {
        contract.deleteAllRecords();
    } catch (err) {
        console.error("Error deleting all records:", err);
    }
}

async function updatePersonRecord(personID, newName, newAge) {
    try {
      await contract.updatePerson(personID, newName, newAge);
    } catch (err) {
      console.error("Error updating person record: ", err);
    }
}

//* STEP 3
console.log("Step 3 varified");

//! -->> FRONTED-ONCLICKS 

const deployButton = document.getElementById("deployButton");
const searchButton = document.getElementById("retrieveButton");
const showListButton = document.getElementById("showButton");
const deleteButton = document.getElementById("deleteButton");
const clearListButton = document.getElementById("clearListButton");
const updateButton = document.getElementById("updateButton");



deployButton.addEventListener("click", async () => {
    const name = document.getElementById("personName").value;
    const age = document.getElementById("personAge").value;
    await createPerson(name, age);
    document.getElementById("personName").value = "";
    document.getElementById("personAge").value = "";
});

searchButton.addEventListener("click", async () => {
    const nameLabel = document.getElementById("personNameLabel");
    const ageLabel = document.getElementById("personAgeLabel");
    const id = document.getElementById("personID").value;
    document.getElementById("personID").value = "";
    try {
        const result = await getPersonRecord(id);
        console.log("searching Person ... ");

        if (result) {
            const [name, age] = result
            nameLabel.textContent = name;
            ageLabel.textContent = age;
        } else {
            nameLabel.textContent = "Person not found";
            ageLabel.textContent = "";
        }
    } catch (err) {
        console.log('Searching person error: ' + err);
    }
});

showListButton.addEventListener("click", async () => {
    console.log("showing list...");
    // Inside your event listener for the "Show" button

    try {
        const personRecords = await getAllPersonRecords();

        const peopleList = document.getElementById("peopleList");
        peopleList.innerHTML = "";
        if (personRecords.length > 0) {
            // Clear any existing content

            // Create an unordered list (<ul>) to display the list of people
            const ul = document.createElement("ul");

            personRecords.forEach((record) => {
                // Create list items for each person record
                const li = document.createElement("li");
                li.textContent = `Person ID: ${record.personID}, Name: ${record.name}, Age: ${record.age}`;
                ul.appendChild(li);
            });

            // Append the unordered list to the "peopleList" div
            peopleList.appendChild(ul);
        }
    } catch (err) {
        console.error("showling the list error :", err);
    }
});

clearListButton.addEventListener("click", async () => {
    console.log('Clear the all Records...');
    await clearPersonRecords();
});

deleteButton.addEventListener("click", async () => {
  const deletePersonID = document.getElementById("deletePersonID").value;

  try {
    await deletePersonRecord(deletePersonID);
    console.log("Person deleted successfully!");
  } catch (err) {
    console.error("Error deleting person: ", err);
  }

  // Clear input field
  document.getElementById("deletePersonID").value = "";
});

updateButton.addEventListener("click", async () => {
    const updatePersonID = document.getElementById("updatePersonID").value;
    const updatePersonName = document.getElementById("updatePersonName").value;
    const updatePersonAge = document.getElementById("updatePersonAge").value;
  
    try {
      await updatePersonRecord(updatePersonID, updatePersonName, updatePersonAge);
      console.log("Person updated successfully!");
    } catch (err) {
      console.error("Error updating person: ", err);
    }
  
    // Clear input fields
    document.getElementById("updatePersonID").value = "";
    document.getElementById("updatePersonName").value = "";
    document.getElementById("updatePersonAge").value = "";
});


//*STEP 4
console.log("Step 4 varified");
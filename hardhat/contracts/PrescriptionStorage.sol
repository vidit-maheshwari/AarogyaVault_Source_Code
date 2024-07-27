// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionStorage {
    struct Prescription {
        string imageURI;
        address uploader;
        uint256 timestamp;
    }

    Prescription[] public prescriptions;

    function storePrescription(string memory imageURI) public {
        prescriptions.push(Prescription({
            imageURI: imageURI,
            uploader: msg.sender,
            timestamp: block.timestamp
        }));
    }

    function getPrescriptions() public view returns (Prescription[] memory) {
        return prescriptions;
    }
}

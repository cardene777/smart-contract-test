// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TransparentLogic is Initializable {
    address public owner;
    string public name;
    uint256 public age;


    function initialize() public initializer {
        owner = msg.sender;
    }

    function setProfile(string memory _name, uint256 _age) external {
        name = _name;
        age = _age;
    }

    function getProfile() external view returns(string memory, uint256){
        return (name, age);
    }

}

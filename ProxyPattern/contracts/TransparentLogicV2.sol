// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TransparentLogicV2 is Initializable {
    address public owner;
    string public name;
    uint256 public age;
    string public favoriteFruit;


    function initialize() public initializer {
        owner = msg.sender;
    }

    function setProfile(
        string memory _name,
        string memory _fruit,
        uint256 _age
    ) external {
        name = _name;
        favoriteFruit = _fruit;
        age = _age;
    }

    function getProfile() external view returns(
        string memory, string memory, uint256
    ){
        return (name, favoriteFruit, age);
    }

}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GreeterV1 is Initializable {
    string greetingV1;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        greetingV1 = "Hello, V1 World!";
    }

    function helloV1() public view returns(string memory) {
        return greetingV1;
    }
}

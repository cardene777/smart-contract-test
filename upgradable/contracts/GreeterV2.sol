//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "./Greeter.sol";

contract GreeterV2 is GreeterV1 {
    bool initializedV2;
    string greetingV2;

    function initializeV2() public initializer {
        require(!initializedV2);
        initializedV2 = true;
        greetingV2 = "Hello, V2 World!";
    }

    function helloV2() public view returns(string memory) {
        require(initializedV2);
        return greetingV2;
    }

    function returnV1StateFromV2() public view returns(string memory) {
        return greetingV1;
    }
}

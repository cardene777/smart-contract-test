// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CardeneToken is ERC20 {
  constructor() ERC20("CARD", "Cardene Token") {
    _mint(msg.sender, 3000);
  }
}

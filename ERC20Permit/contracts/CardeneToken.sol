// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CardeneToken is ERC20 {
    // トークン名は"Cardene Token"、トークンシンボルは"CARD"。
    constructor() ERC20("Cardene Token", "CARD") {}

    /// @notice CARDトークンを発行する関数。
    /// @ param _to 発行したトークンを送るアドレス。
    /// @ param _amount 発行するトークン数。
    function mint(address _to, uint _amount) external {
        _mint(_to, _amount);
    }
}

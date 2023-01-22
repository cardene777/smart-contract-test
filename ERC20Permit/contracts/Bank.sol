// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Bank is ERC20, Ownable, ERC20Permit {
    // ERC20とERC20Permitのconstructorを呼び出しています。
    constructor(string memory name, string memory symbol) ERC20(name, symbol) ERC20Permit(name) {}

    /// @notice ERC20トークンを発行する関数。
    /// @param to ERC20トークンを送りたいアドレス。
    /// @param amount 発行するERC20トークンの量。
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice msg.senderからコントラクトにamount分のERC20トークンを送る関数。
    /// @param amount 送りたいERC20トークンの量。
    function deposit(uint amount) external {
        transferFrom(msg.sender, address(this), amount);
    }

    /// @notice permit関数を実行し、第3者がガス代を負担して、特定のアドレスにERC20トークンを送る関数。
    /// @param amount 送りたいERC20トークンの量。
    /// @param deadline 実行できる期限。
    /// @param v リカバリーID。
    /// @param r ECDSA署名の出力。
    /// @param s ECDSA署名の出力。
    function depositWithPermit(address _owner, address _spender, uint amount, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
        permit(_owner, _spender, amount, deadline, v, r, s);
        require(allowance(_owner, _spender) > 0, "There are no tokens allowed for transfer.");
        transferFrom(_owner, _spender, amount);
    }
}

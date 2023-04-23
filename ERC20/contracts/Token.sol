// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Token is AccessControlEnumerable, ERC20Pausable, ERC20Burnable, ERC20Capped {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 public constant CAP_AMOUNT = 1e10 * 1e18;

    constructor() ERC20("CARD", "Cardene Token") ERC20Capped(CAP_AMOUNT) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
        super._mint(account, amount);
    }

    // function pause() external  onlyRole(PAUSER_ROLE)  {
    //     _pause();
    // }
    function pause() external {
        require(hasRole(PAUSER_ROLE, msg.sender), "You do not have a role that can be executed.");
        _pause();
    }

    // function unpause() external onlyRole(PAUSER_ROLE)  {
    //     _unpause();
    // }
    function unpause() external {
        require(hasRole(PAUSER_ROLE, msg.sender), "You do not have a role that can be executed.");
        _unpause();
    }

    // function burn(uint256 amount) public onlyRole(BURNER_ROLE) override {
    //     super.burn(amount);
    // }
    function burn(uint256 amount) public override {
        require(hasRole(BURNER_ROLE, msg.sender), "You do not have a role that can be executed.");
        super.burn(amount);
    }

    function burnFrom(address account, uint256 amount) public onlyRole(BURNER_ROLE) override {
        super.burnFrom(account, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}

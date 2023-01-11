// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract UUPSLogicV2 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    string public myName;
    uint256 public myAge;
    string public favoriteFruit;

    /// @notice 一度だけ実行される関数。constructorの代わり。
    function initialize() public initializer {
        __ERC20_init("Cardene Token", "CARD");
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    /// @notice msg.senderがコントラクトのアプグレード許可されていない時に処理を元に戻す関数。
    /// @dev 基本的にonlyOwnerなどのアクセス修飾子をつける。
    function _authorizeUpgrade(address) internal override onlyOwner {}

    /// @notice プロフィール情報を更新する関数。
    /// @param _name 名前。
    /// @param _fruit 好きな果物。
    /// @param _age 年齢。
    function setProfile(
        string memory _name,
        string memory _fruit,
        uint256 _age
    ) external {
        myName = _name;
        favoriteFruit = _fruit;
        myAge = _age;
    }

    /// @notice プロフィール情報を取得する関数。
    /// @return name 名前。
    /// @return favoriteFruit 好きな果物。
    /// @return age 年齢。
    function getProfile() external view returns(
        string memory, string memory, uint256
    ){
        return (myName, favoriteFruit, myAge);
    }

}

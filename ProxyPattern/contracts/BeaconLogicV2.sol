// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BeaconLogicV2 is Initializable {
    address public owner;
    string public name;
    uint256 public age;
    string public favoriteFruit;


    /// @notice 一度だけ実行される関数。constructorの代わり。
    function initialize() public initializer {
        owner = msg.sender;
    }

    /// @notice プロフィール情報を更新する関数。
    /// @param _name 名前。
    /// @param _fruit 好きな果物。
    /// @param _age 年齢。
    function setProfile(
        string memory _name,
        string memory _fruit,
        uint256 _age
    ) external {
        name = _name;
        favoriteFruit = _fruit;
        age = _age;
    }

    /// @notice プロフィール情報を取得する関数。
    /// @return name 名前。
    /// @return favoriteFruit 好きな果物。
    /// @return age 年齢。
    function getProfile() external view returns(
        string memory, string memory, uint256
    ){
        return (name, favoriteFruit, age);
    }

}

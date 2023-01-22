// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20Permit {
    /// @notice ERC20トークンの総量を返す関数。
    function totalSupply() external view returns (uint);

    /// @notice accountに渡されたアドレスが所有しているERC20トークンの量を返す関数。
    /// @param account 特定のアドレス。
    /// @return アドレスが所有しているERC20トークンの量。
    function balanceOf(address account) external view returns (uint);

    /// @notice recipientに渡されたアドレスに、amount分のERC20トークンを送る関数。
    /// @param recipient ERC20トークンの送り先アドレス。
    /// @param amount 送りたいERC20トークンの量。
    /// @return 送金が成功したか失敗したかのbool値。
    function transfer(address recipient, uint amount) external returns (bool);

    /// @notice spenderに渡されたアドレスが、ownerが所有するERC20トークンをどれくらい送る許可を与えられているか返す関数。
    /// @param owner ERC20トークンの所有者アドレス。
    /// @param spender ownerが所有するERC20トークンをどれくらいの量送る許可を与えられているか確認したいアドレス。
    /// @return ERC20トークンを送れる許可を与えられている量。
    function allowance(address owner, address spender) external view returns (uint);

    /// @notice spenderで指定されたアドレスに、amout分のERC20トークンの送る許可を与える関数。
    /// @param spender ERC20トークンを送る許可を与えたいアドレス。
    /// @param amount　許可を与えるERC20トークンの量。
    /// @return 実行が成功したかのbool値。
    function approve(address spender, uint amount) external returns (bool);

    /// @notice spenderに渡されたアドレスから、recipientに渡されたアドレスへamount分のERC20トークンを送る関数。
    /// @param sender ERC20トークンの所有者アドレス。
    /// @param recipient senderのERC20トークンを送る許可を与えられているアドレス。
    /// @param amount 送りたいERC20トークンの量。
    /// @return 実行が成功したかのbool値。
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    /// @notice 第3者アドレスがERC20トークンを送る関数。
    /// @param owner ERC20トークンの所有者アドレス。
    /// @param spender ERC20トークンを代わりに送るアドレス。（ガス代を代わりに負担）
    /// @param value　送りたいERC20トークンの量。
    /// @param deadline 送れる期限。
    /// @param v リカバリーID。
    /// @param r ECDSA署名の出力。
    /// @param s ECDSA署名の出力。
    function permit(
        address owner,
        address spender,
        uint value,
        uint deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    //　イベント
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

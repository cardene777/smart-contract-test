const { expect } = require("chai")
const { ethers } = require("hardhat")

// 署名を作成。
async function getPermitSignature(owner, contract, spender, value, deadline) {
    const [nonce, name, version, chainId] = await Promise.all([
        contract.nonces(owner.address),
        contract.name(),
        "1",
        owner.getChainId(),
    ])

    return ethers.utils.splitSignature(
        await owner._signTypedData(
        {
            name,
            version,
            chainId,
            verifyingContract: contract.address,
        },
        {
            Permit: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "spender",
                type: "address",
            },
            {
                name: "value",
                type: "uint256",
            },
            {
                name: "nonce",
                type: "uint256",
            },
            {
                name: "deadline",
                type: "uint256",
            },
            ],
        },
        {
            owner: owner.address,
            spender,
            value,
            nonce,
            deadline,
        }
        )
    )
}

describe("ERC20Permit", function () {
    it("ERC20 permit", async function () {
        // アドレスを用意
        // owner: ERC20トークンの所有者。
        // contractOwner: Bankコントラクトをデプロイするアドレス。
        // Admin: ERC20トークンを受け取り、ガス代を支払うアドレス。
        [owner, contractOwner, admin] = await ethers.getSigners();

        // Bankコントラクトをデプロイ。
        const Bank = await ethers.getContractFactory("Bank", contractOwner)
        const bank = await Bank.deploy("Cardene Token", "CARD")
        await bank.deployed()

        // 1000のERC20トークンを発行。
        const amount = 1000
        await bank.connect(contractOwner).mint(owner.address, amount)

        // ERC20Permitの処理が有効な期間を指定。
        // 今回は指定できる最大値を指定。
        const deadline = ethers.constants.MaxUint256

        // ownerアドレスによる署名を作成。
        const { v, r, s } = await getPermitSignature(
            owner,
            bank,
            admin.address,
            amount,
            deadline
        )

        // ERC20Permitを実行して、ownerアドレスからadminアドレスにERC20トークンを送る。
        await bank.connect(admin).depositWithPermit(owner.address, admin.address, amount, deadline, v, r, s)

        // adminアドレスにERC20トークンが送れているか確認。
        expect(await bank.connect(admin).balanceOf(admin.address)).to.equal(amount)
    })
})

const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("UUPSLogic", function () {
    beforeEach(async function () {
        // アドレスの作成
        [owner, wallet1, wallet2] = await ethers.getSigners();

        // UUPSLogicとUUPSLogicV2コントラクトを取得。
        UUPSLogic = await ethers.getContractFactory("UUPSLogic", owner);
        UUPSLogicV2 = await ethers.getContractFactory("UUPSLogicV2", owner);

        // UUPSLogicコントラクトをデプロイ。
        UUPSLogicInstance = await upgrades.deployProxy(
            UUPSLogic,
            { kind: 'uups' }
        );
    });

    describe('test UUPSLogic', function () {
        it("setProfile関数を実行して、name: Cardene, age: 23を格納", async function () {
            await UUPSLogicInstance.setProfile("Cardene", 23);
            expect((await UUPSLogicInstance.myName())).to.equal("Cardene");
            expect((await UUPSLogicInstance.myAge())).to.equal(23);

        })

        it("UUPSLogicV2コントラクトに更新", async function () {
            UUPSLogicV2Instance = await upgrades.upgradeProxy(
                UUPSLogicInstance.address,
                UUPSLogicV2
            );
        })

        it("setProfile関数を実行して、name: Cardene V2, favoriteFruit: Pear, age: 30を格納", async function () {
            await UUPSLogicV2Instance.setProfile("Cardene V2", "Pear", 30);
            expect((await UUPSLogicV2Instance.myName())).to.equal("Cardene V2");
            expect((await UUPSLogicV2Instance.myAge())).to.equal(30);
            expect((await UUPSLogicV2Instance.favoriteFruit())).to.equal("Pear");
        })
    });
});

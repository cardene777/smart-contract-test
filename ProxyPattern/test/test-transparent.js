const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TransparentLogic", function () {
    beforeEach(async function () {
        // アドレスの作成
        [owner, wallet1, wallet2] = await ethers.getSigners();

        // TransparentLogicとTransparentLogicV2コントラクトを取得。
        transparentLogic = await ethers.getContractFactory("TransparentLogic", owner);
        transparentLogicV2 = await ethers.getContractFactory("TransparentLogicV2", owner);

        // TransparentLogicコントラクトをデプロイ。
        transparentLogicInstance = await upgrades.deployProxy(transparentLogic);
    });

    describe('test TransparentLogic', function () {
        it("Owner変数の値を確認", async function () {
            expect((await transparentLogicInstance.owner())).to.equal(owner.address);
        })

        it("setProfile関数を実行して、name: Cardene, age: 23を格納", async function () {
            await transparentLogicInstance.setProfile("Cardene", 23);
            expect((await transparentLogicInstance.name())).to.equal("Cardene");
            expect((await transparentLogicInstance.age())).to.equal(23);

        })

        it("transparentLogicV2コントラクトに更新", async function () {
            transparentLogicV2Instance = await upgrades.upgradeProxy(
                transparentLogicInstance.address,
                transparentLogicV2
            );
        })

        it("setProfile関数を実行して、name: Cardene V2, favoriteFruit: Pear, age: 30を格納", async function () {
            await transparentLogicV2Instance.setProfile("Cardene V2", "Pear", 30);
            expect((await transparentLogicV2Instance.name())).to.equal("Cardene V2");
            expect((await transparentLogicV2Instance.age())).to.equal(30);
            expect((await transparentLogicV2Instance.favoriteFruit())).to.equal("Pear");
        })
    });
});

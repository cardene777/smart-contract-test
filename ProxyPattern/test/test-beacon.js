const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TransparentLogic", function () {
    beforeEach(async function () {
        // アドレスの作成
        [owner, wallet1, wallet2] = await ethers.getSigners();

        // BeaconLogicとBeaconLogicV2コントラクトを取得。
        beaconLogic = await ethers.getContractFactory("BeaconLogic", owner);
        beaconLogicV2 = await ethers.getContractFactory("BeaconLogicV2", owner);

        // BeaconLogicコントラクトをデプロイ。
        beaconInstance = await upgrades.deployBeacon(beaconLogic);
        beaconLogicInstance = await upgrades.deployBeaconProxy(
            beaconInstance,
            beaconLogic
        );
    });

    describe('test BeaconLogic', function () {
        it("Owner変数の値を確認", async function () {
            expect((await beaconLogicInstance.owner())).to.equal(owner.address);
        })

        it("setProfile関数を実行して、name: Cardene, age: 23を格納", async function () {
            await beaconLogicInstance.setProfile("Cardene", 23);
            expect((await beaconLogicInstance.name())).to.equal("Cardene");
            expect((await beaconLogicInstance.age())).to.equal(23);

        })

        it("transparentLogicV2コントラクトに更新", async function () {
            await upgrades.upgradeBeacon(
                beaconInstance.address,
                beaconLogicV2
            );
            beaconLogicV2Instance = beaconLogicV2.attach(beaconLogicInstance.address)
        })

        it("setProfile関数を実行して、name: Cardene V2, favoriteFruit: Pear, age: 30を格納", async function () {
            await beaconLogicV2Instance.setProfile("Cardene V2", "Pear", 30);
            expect((await beaconLogicV2Instance.name())).to.equal("Cardene V2");
            expect((await beaconLogicV2Instance.age())).to.equal(30);
            expect((await beaconLogicV2Instance.favoriteFruit())).to.equal("Pear");
        })
    });
});

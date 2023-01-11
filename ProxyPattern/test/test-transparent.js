const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TransparentLogic", function () {
    beforeEach(async function () {
        [owner, wallet1, wallet2] = await ethers.getSigners();

        transparentLogic = await ethers.getContractFactory("TransparentLogic", owner);
        transparentLogicV2 = await ethers.getContractFactory("TransparentLogicV2", owner);

        // deploy
        transparentLogicInstance = await upgrades.deployProxy(transparentLogic);
    });

    describe('test TransparentLogic', function () {
        it("check owner", async function () {
            expect((await transparentLogicInstance.owner())).to.equal(owner.address);
            console.log(`Owner Address: ${transparentLogicInstance.owner()}`)
        })

        it("name: Cardene, age: 23の格納", async function () {
            // name: Cardene, age: 23
            await transparentLogicInstance.setProfile("Cardene", 23);
            expect((await transparentLogicInstance.name())).to.equal("Cardene");
            expect((await transparentLogicInstance.age())).to.equal(23);

            console.log(`Name: ${transparentLogicInstance.name()}`)
            console.log(`Age: ${transparentLogicInstance.age()}`)
        })

        it("Upgrade Contract", async function () {
            // upgrade
            const transparentLogicV2Instance = await upgrades.upgradeProxy(
                transparentLogicInstance.address,
                transparentLogicV2
            );

            // name: Cardene V2, favoriteFruit: Pear, age: 30
            await transparentLogicV2Instance.setProfile("Cardene V2", "Pear", 30);
            expect((await transparentLogicV2Instance.name())).to.equal("Cardene V2");
            expect((await transparentLogicV2Instance.age())).to.equal(30);
            expect((await transparentLogicV2Instance.favoriteFruit())).to.equal("Pear");

            console.log(`Name V2: ${transparentLogicV2Instance.name()}`)
            console.log(`Age V2: ${transparentLogicV2Instance.age()}`)
            console.log(`Fruit V2: ${transparentLogicV2Instance.favoriteFruit()}`)
        })
    });
});

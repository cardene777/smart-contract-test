const { expect } = require("chai");

describe("ERC721A", function () {
  beforeEach(async function () {
    [owner, wallet1, wallet2] = await ethers.getSigners();

    // ERC721Aコントラクトを取得。
    ERC721A = await ethers.getContractFactory("ERC721ANFT", owner);

    // ERC721Aコントラクトをデプロイ。
    erc721A = await ERC721A.deploy();

    // トークンをmintする。
    await erc721A.connect(wallet1).mint(10);
    await erc721A.connect(wallet2).mint(20);
    await erc721A.connect(wallet1).mint(5);
    expect(await erc721A.totalSupply()).to.equal(35);
  });

  describe("Check ERC721A Token", function () {
    // トークンの総供給量を確認
    it("Total Supply", async function () {
      expect(await erc721A.totalSupply()).to.equal(35);
    });
    // Wallet1が所有しているトークンの総量を確認
    it("Wallet1 BalanceOf", async function () {
      expect(await erc721A.balanceOf(wallet1.address)).to.equal(15);
    });
    // Wallet2が所有しているトークンの総量を確認
    it("Wallet2 BalanceOf", async function () {
      expect(await erc721A.balanceOf(wallet2.address)).to.equal(20);
    });
    // トークン1の所有者を確認
    it("Token1 ownerOf", async function () {
      expect(await erc721A.ownerOf(1)).to.equal(wallet1.address);
    });
    // トークン15の所有者を確認
    it("Token1 ownerOf", async function () {
      expect(await erc721A.ownerOf(15)).to.equal(wallet2.address);
    });
      ;
  });
  describe("Check ERC721A Token List", function () {
    // wallet1が所有しているトークンの量を確認
      it("wallet1 tokensOfOwner", async function () {
          const wallet1Token = await erc721A.tokensOfOwner(wallet1.address);
        expect(wallet1Token.length).to.equal(15);
    });
    // wallet2が所有しているトークンの量を確認
      it("wallet1 tokensOfOwner", async function () {
          const wallet2Token = await erc721A.tokensOfOwner(wallet2.address);
        expect(wallet2Token.length).to.equal(20);
    });
      ;
  });
});

const { expect } = require("chai");

describe('Bank', function () {
    beforeEach(async function() {
        [owner, wallet1, wallet2] = await ethers.getSigners();

        // BankコントラクトとTokenコントラクトを取得。
        Bank = await ethers.getContractFactory('Bank', owner);
        CardeneToken = await ethers.getContractFactory('CardeneToken', wallet1);

        // BankコントラクトとTokenコントラクトをデプロイ。
        bank = await Bank.deploy();
        token = await CardeneToken.deploy();

        // wallet1アドレスから、wallet2アドレスににCARDトークンを1000送る。
        token.connect(wallet1).transfer(wallet2.address, 1000);

        // CARDトークンを発行したwallet1アドレスから、
        // Bankコントラクトアドレスに対して5000CARDトークンの転送許可を与える。
        await token.connect(wallet1).approve(
            bank.address,
            2000
        );

        // CARDトークンを発行したwallet1アドレスから、
        // wallet2アドレスに対して1000CARDトークンの転送許可を与える。
        await token.connect(wallet2).approve(
            bank.address,
            1000
        );

        // TokenコントラクトをBytes32型に変換。
        CARD_TOKEN = ethers.utils.formatBytes32String('CardeneToken');

        // BankコントラクトのwhitelistToken関数を呼び出して、
        // CARDトークンの預け入れ・引き出しができるように登録。
        await bank.whitelistToken(
            CARD_TOKEN,
            token.address
        );
    });

    describe('deployment', function () {
        // wallet1アドレスが5000CARDトークンを取得しているかチェック。
        it('should mint tokens to wallet 1', async function () {
            expect(await token.balanceOf(wallet1.address)).to.equal(2000);
        })

        // wallet2アドレスが1000CARDトークンを取得しているかチェック。
        it('should transfer tokens to wallet 2', async function () {
        expect(await token.balanceOf(wallet2.address)).to.equal(1000);
        })

        // BankコントラクトのwhitelistedTokens関数を実行して、
        // 預け入れ・引き出しができるトークンがCARDトークンであるかチェック。
        it('should whitelist CARD token on the contract', async function () {
        expect(
            await bank.whitelistedTokens(CARD_TOKEN)
            ).to.equal(token.address);
        })
    })

    describe('depositTokens', function () {
        it('should deposit CARD token', async function () {
            // wallet1から100CARDトークンを預け入れる。
            await bank.connect(wallet1).depositTokens(
                500,
                CARD_TOKEN,
            );

            // wallet2から50CARDトークンを預け入れる。
            await bank.connect(wallet2).depositTokens(
                300,
                CARD_TOKEN,
            );

            // wallet1とwallet2のトークン残高を確認。
            expect(await token.balanceOf(wallet1.address)).to.equal(1500);
            expect(await token.balanceOf(wallet2.address)).to.equal(700);

            // Bankコントラクトにしっかり預け入れているか確認。
            expect(
                await bank.accountBalances(wallet1.address, CARD_TOKEN)
            ).to.equal(500);
            expect(
                await bank.accountBalances(wallet2.address, CARD_TOKEN)
            ).to.equal(300);
        });
    })

    describe('withdraw', function () {
        it('should withdraw CARD token from the contract', async function () {
            // wallet1から追加で600CARDトークンを預け入れる。
            await bank.connect(wallet1).depositTokens(
                1000,
                CARD_TOKEN,
            );
            // 100CARDトークンを引き出す。
            await bank.connect(wallet1).withdrawTokens(
                500,
                CARD_TOKEN,
            );

            // 600CARDトークンを預け入れ、100CARDトークンを引き出しので、
            // wallet1は4500CARDトークンを保持していはずなので確認。
            expect(await token.balanceOf(wallet1.address)).to.equal(1500);

            // wallet1がBankコントラクトにどのくらいCARDトークンを預けているか確認。
            expect(
                await bank.accountBalances(wallet1.address, CARD_TOKEN)
            ).to.equal(500);
            })

            // 預け入れているよりも多くのCARDトークンを引き出してエラーが起きるかチェック。
            it('should not allow withdrawing more than has been deposited', async function () {
                await expect(
                    bank.connect(wallet1).withdrawTokens(1000, CARD_TOKEN)
                ).to.be.revertedWith("Insufficent funds")
            }
        )
    })
})

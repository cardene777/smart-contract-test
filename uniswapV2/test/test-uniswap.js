const BN = require("bn.js");
const { sendEther } = require("./util");
const { DAI, WBTC, WBTC_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const Uniswap = artifacts.require("Uniswap");

contract("Uniswap", (accounts) => {
    const WHALE = WBTC_WHALE;
    const AMOUNT_IN = 100000000;
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = WBTC;
    const TOKEN_OUT = DAI;
    const TO = accounts[0];

    let uniswap;
    let tokenIn;
    let tokenOut;
    beforeEach(async () => {
        tokenIn = await IERC20.at(TOKEN_IN);
        tokenOut = await IERC20.at(TOKEN_OUT);
        uniswap = await Uniswap.new();

        // make sure WHALE has enough ETH to send tx
        // await sendEther(web3, accounts[0], WHALE, 1);
        await tokenIn.approve(uniswap.address, AMOUNT_IN, { from: WHALE });
    });

    it("should pass", async () => {
        await uniswap.swap(
        tokenIn.address,
        tokenOut.address,
        AMOUNT_IN,
        AMOUNT_OUT_MIN,
        TO,
        {
            from: WHALE,
        }
        );

        console.log(`in ${AMOUNT_IN}`);
        console.log(`out ${await tokenOut.balanceOf(TO)}`);
    });
});

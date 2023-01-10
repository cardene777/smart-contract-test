## Setup

```sh
npm ci
```

- Get Alchemy API

- https://www.alchemy.com/

＊Solidity Version - 0.7.6

## Compile

```sh
npx hardhat compile
```

## Hardhat Test

### Swap

#### Tab1

```sh
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/{YOUR_API_KEY}
```

### Tab2

```sh
npx hardhat test --network localhost
```

## Reference

- [Uniswap Doc](https://docs.uniswap.org/contracts/v3/guides/local-environment)
- [Building Your First Uniswap Integration](https://uniswap.org/blog/your-first-uniswap-integration)


## Setup

### Activate Virtual Environment

```sh
python -m venv .venv
source .venv/bin/activate
```

### Install Module

```sh
npm ci
```

### .env

- Create .env File

```sh
cp .env.sample .env
```

- Get Infra API KEY

- [Infra](https://app.infura.io/dashboard)

```sh:.env
...
WEB3_INFURA_API_KEY=
...
```

### Reflection of environment variables

```sh
source .env
```

## Compile Truffle

```sh
truffle compile
```

or

```sh
./node_modules/.bin/truffle compile
```

## Test

### Tab1

```sh
npx ganache-cli \
--fork https://mainnet.infura.io/v3/$WEB3_INFURA_PROJECT_ID \
--unlock $DAI_WHALE \
--networkId 999
```

### Tab2

```sh
npx truffle test --network mainnet_fork test/test-uniswap.js
```



## Reference

- [Uniswap 🔀 Testing](https://hackernoon.com/uniswap-testing)
- [stakewithus/defi-by-example](https://github.com/stakewithus/defi-by-example)
- [Uniswap V2 - Swap Tokens | DeFi](https://www.youtube.com/watch?v=qB2Ulx201wY&t=483s)

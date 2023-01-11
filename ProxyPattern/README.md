
## Setup

```sh
npm ci
```

## Compile

```sh
npx hardhat compile
```

## Transparent Proxy Test

### Tab1

```sh
npx hardhat node --network hardhat
```

### Tab2

```sh
npx hardhat test test/test-transparent.js --network localhost
```


## Reference

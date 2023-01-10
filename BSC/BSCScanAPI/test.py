import os
import asyncio
from bscscan import BscScan

from dotenv import load_dotenv
load_dotenv()

BSC_API_KEY = os.getenv("BSC_API_KEY")


def printDelimiter():
    print("=" * 50)


async def get_total_bnb_supply():
    async with BscScan(BSC_API_KEY) as bsc:
        print(f"get_total_bnb_supply: {await bsc.get_total_bnb_supply()}")


async def get_validators_list():
    async with BscScan(BSC_API_KEY) as bsc:
        print(f"get_validators_list: {await bsc.get_validators_list()}")


async def get_contract_source_code():
    async with BscScan(BSC_API_KEY) as bsc:
        print(f"get_contract_source_code: {await bsc.get_contract_source_code('0xF9f01010DDad7cf8dDeB526C89A0c3134fA019C4')}")

if __name__ == "__main__":
    printDelimiter()
    asyncio.run(get_total_bnb_supply())
    printDelimiter()
    asyncio.run(get_validators_list())
    printDelimiter()
    asyncio.run(get_contract_source_code())

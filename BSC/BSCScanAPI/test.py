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

if __name__ == "__main__":
    printDelimiter()
    asyncio.run(get_total_bnb_supply())
    printDelimiter()
    asyncio.run(get_validators_list())
    printDelimiter()

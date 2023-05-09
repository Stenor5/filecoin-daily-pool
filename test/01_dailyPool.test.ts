import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployments, ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Ship } from "../utils";
import { BigNumber } from "ethers";
import { DailyPool, DailyPool__factory, TestUSDT, TestUSDT__factory } from "../types";

chai.use(solidity);
const { expect, assert } = chai;

let ship: Ship;
let dailyPool: DailyPool;
let testUSDT: TestUSDT;

let deployer: SignerWithAddress;
let alice: SignerWithAddress;
let vault: SignerWithAddress;

const setup = deployments.createFixture(async (hre) => {
  ship = await Ship.init(hre);
  const { accounts, users } = ship;
  await deployments.fixture(["all"]);

  return {
    ship,
    accounts,
    users,
  };
});

describe("Daily pool unit tests", () => {
  let depositAmount: BigNumber;
  beforeEach(async () => {
    const scaffold = await setup();

    deployer = scaffold.accounts.deployer;
    alice = scaffold.accounts.alice;
    vault = scaffold.accounts.vault;

    dailyPool = await ship.connect(DailyPool__factory);
    testUSDT = await ship.connect(TestUSDT__factory);
    console.log((await testUSDT.balanceOf(deployer.address)).toString());
    depositAmount = await dailyPool.depositAmount();
  });

  describe("Deposit", () => {
    it("emits an event after deposit fund", async () => {
      console.log(BigNumber.from(depositAmount).toNumber());
    });
  });
});

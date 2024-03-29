import { DeployFunction } from "hardhat-deploy/types";
import { TestUSDT__factory } from "../types";
import { Ship } from "../utils";

const func: DeployFunction = async (hre) => {
  const { deploy } = await Ship.init(hre);

  await deploy(TestUSDT__factory);
};

export default func;
func.tags = ["test-usdt", "test-all"];

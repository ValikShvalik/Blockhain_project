import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployPaymentContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("PaymentContract", {
    from: deployer,
    log: true,
  });
};

export default deployPaymentContract;
deployPaymentContract.tags = ["PaymentContract"];

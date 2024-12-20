/* import { expect } from "chai";
import { ethers } from "hardhat";  // Используйте ethers, импортированный через Hardhat
import { Signer } from "ethers";  // Импортируйте Signer из ethers
import { ContractFactory, utils } from "ethers";  // Импортируйте utils отдельно

describe("PaymentContract", function () {
  let contract: PaymentContract;  // Тип для контракта
  let owner: Signer;  // Тип для владельца
  let addr1: Signer;  // Тип для второго адреса

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const PaymentContractFactory: ContractFactory = await ethers.getContractFactory("PaymentContract");

    contract = (await PaymentContractFactory.deploy()) as PaymentContract;

    await contract.deployed();
  });

  it("Should accept payments", async function () {
    await addr1.sendTransaction({
      to: contract.address,
      value: utils.parseEther("1.0"),  // Используем utils отдельно
    });

    const balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.equal(utils.parseEther("1.0"));
  });

  it("Should allow the owner to withdraw", async function () {
    await addr1.sendTransaction({
      to: contract.address,
      value: utils.parseEther("1.0"),
    });

    await contract.connect(owner).withdraw();

    const balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.equal(0);
  });

  it("Should not allow others to withdraw", async function () {
    await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
      "Only the owner can withdraw"
    );
  });
});
*/

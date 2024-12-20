"use client";

import { useState } from "react";
import { BrowserProvider, Contract, formatEther, parseEther } from "ethers";

export default function Home() {
  const [balance, setBalance] = useState<string>("0");
  const [contractAddress] = useState<string>("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const [amount, setAmount] = useState<string>("");

  // Функция для получения провайдера и контракта
  const getProviderAndContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(
      contractAddress,
      [
        "function owner() public view returns (address)",
        "function getBalance() public view returns (uint256)",
        "function withdraw() public",
      ],
      signer,
    );
    return { provider, signer, contract };
  };

  const fetchBalance = async () => {
    const { contract } = await getProviderAndContract();
    const balance = await contract.getBalance();
    setBalance(formatEther(balance)); // Форматируем баланс
  };

  const sendPayment = async () => {
    const { signer } = await getProviderAndContract();
    const tx = await signer.sendTransaction({
      to: contractAddress,
      value: parseEther(amount),
    });
    await tx.wait();
    alert("Payment sent!");
    fetchBalance();
  };

  const withdrawFunds = async () => {
    const { contract } = await getProviderAndContract();
    await contract.withdraw();
    alert("Funds withdrawn!");
    fetchBalance();
  };

  return (
    <div>
      <h1>Payment DApp</h1>
      <p>Contract Address: {contractAddress}</p>
      <p>Balance: {balance} ETH</p>
      <button onClick={fetchBalance}>Fetch Balance</button>
      <div>
        <h2>Send Payment</h2>
        <input type="text" placeholder="Amount in ETH" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={sendPayment}>Send</button>
      </div>
      <div>
        <h2>Withdraw Funds</h2>
        <button onClick={withdrawFunds}>Withdraw</button>
      </div>
    </div>
  );
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;

    // Событие для логирования платежей
    event PaymentReceived(address indexed from, uint256 amount);

    // Конструктор контракта (установка владельца)
    constructor() {
        owner = msg.sender;
    }

    // Функция для получения платежей
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    // Функция для вывода средств владельцем контракта
    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Получение текущего баланса контракта
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

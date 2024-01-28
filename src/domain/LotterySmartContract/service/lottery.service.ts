import { Injectable } from '@nestjs/common';
import LotterySmartContract from '../entity/LotterySmartContract';
import { Bet } from '../interface/Bet';
import { DefaultErrors } from '../utils/enumHelper';
import ContractDetailsLottery from '../infra/ContractDetailsLottery';
import Web3Conn from '../infra/Web3Conn';

@Injectable()
export class LotteryService {
  private _lotterySmartContract: LotterySmartContract;
  private _contract: any;

  constructor() {
    const contractDetailsLottery = new ContractDetailsLottery();

    const web3Conn = new Web3Conn(
      contractDetailsLottery.getContractServerProvider(),
    );

    this._lotterySmartContract = new LotterySmartContract(
      contractDetailsLottery,
      web3Conn,
    );

    this._contract = this._lotterySmartContract.getContract();
  }

  async getWinner(): Promise<string> {
    try {
      const winner = await this._contract.methods.pickWinner().call();
      return winner;
    } catch (error) {
      return DefaultErrors.WinnerNotRetrivied;
    }
  }

  async getContractName(): Promise<string> {
    try {
      const data = await this._contract.methods.contractName().call();
      return data;
    } catch (error) {
      return DefaultErrors.RetrieveContractName;
    }
  }

  async placeBet(bet: Bet): Promise<string> {
    try {

      const { betValue, betAmount, address } = bet;

      const wei = this._lotterySmartContract.getToWei(betAmount);
      const result = await this._contract.methods.enter().send({
        from: address,
        gasPrice: this._lotterySmartContract.getToWei('0.1'),
        value: wei,
      });

      return result;
    } catch (error) {
      return DefaultErrors.BetError.concat(error);
    }
  }

  async getPlayers(): Promise<string> {
    const players = await this._contract.methods.getPlayers().call();
    return players;
  }

}

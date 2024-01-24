import { Injectable } from '@nestjs/common';
import LotterySmartContract from './LotterySmartContract';
import { Bet } from './Bet';
import { DefaultErrors } from './enumHelper';

@Injectable()
export class LotteryService {
  private _lotterySmartContract: LotterySmartContract;
  private _contract: any;

  constructor() {
    this._lotterySmartContract = new LotterySmartContract();
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
        value: wei,
      });

      return result;
    } catch (error) {
      return DefaultErrors.BetError;
    }
  }
}

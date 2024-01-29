import { Injectable } from '@nestjs/common';
import LotterySmartContract from '../entity/LotterySmartContract';
import { Bet } from '../interface/Bet';
import { DefaultErrors } from '../utils/enumHelper';
import LotteryFactory from '../factory/LotteryFactory';

@Injectable()
export class LotteryService {
  private _lotterySmartContract: LotterySmartContract;

  constructor() {
    const lotteryFactory = new LotteryFactory();
    this._lotterySmartContract = lotteryFactory.getSmartContract();
  }

  async pickWinner(): Promise<string> {
    try {
      const result = await this._lotterySmartContract.pickWinner();
      return result;
    } catch (error) {
      return DefaultErrors.WinnerNotRetrivied.concat(` ${error} `);
    }
  }

  async getContractName(): Promise<string> {
    try {
      const result = await this._lotterySmartContract.contractName();
      return result;
    } catch (error) {
      return DefaultErrors.RetrieveContractName;
    }
  }

  async placeBet(bet: Bet): Promise<string> {
    try {
      const result = await this._lotterySmartContract.enter(bet);
      return result;
    } catch (error) {
      return DefaultErrors.BetError.concat(error);
    }
  }

  async getPlayers(): Promise<string> {
    const players = await this._lotterySmartContract.getPlayers();
    return players;
  }
}

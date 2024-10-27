import { Injectable } from '@nestjs/common';
import { LotterySmartContract } from '../entity/LotterySmartContract';
import { DefaultErrors } from '../utils/enumHelper';
import LotterySmartContractFactory from '../factory/LotterySmartContractFactory';
import { Player } from '../entity/Player';

@Injectable()
export class LotteryService {
  private _lotterySmartContract: LotterySmartContract;

  constructor() {
    const lotterySmartContractFactory = new LotterySmartContractFactory();
    this._lotterySmartContract = lotterySmartContractFactory
      .buildSmartContractLottery();
  }
  
  async placeBet(players: Player[] ): Promise<boolean | any> {
    try {
      const result = await this._lotterySmartContract.enter(players);
      return result
    } catch (error) {
      return DefaultErrors.BetError.concat(error);
    }
  }

  public async pickWinner(): Promise<any> {
    try {
        const result = await this._lotterySmartContract.pickWinner(); 
        return result;
    } catch (error) {
      throw new Error("Failed to pick winner.");
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

  async getPlayers(): Promise<string[]> {
    const players = await this._lotterySmartContract.getPlayers();
    return players;
  }
}

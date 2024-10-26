import { Player } from "./Player";

export interface LotterySmartContract {
  enter(players: Player[]): Promise<boolean>;
  pickWinner(): Promise<void>;
  getPlayers(): Promise<string[]>;
  contractName(): Promise<string>;
}
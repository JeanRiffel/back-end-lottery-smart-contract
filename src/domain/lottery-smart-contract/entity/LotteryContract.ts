import ContractDetails from './ContractDetails';
import Web3Connection from './Web3Connection';
import { LotterySmartContract } from './LotterySmartContract';
import { Player } from './Player';

class LotteryContract implements LotterySmartContract {
  private _contract: any;
  private _web3: any;
  private _contractAddress: any;

  public constructor(
    contractDetails: ContractDetails,
    web3Conn: Web3Connection,
  ) {
    const abi = contractDetails.getABI();
    this._contractAddress = contractDetails.getContractAddress();
    this._web3 = web3Conn.getConnection();
    this._contract = new this._web3.eth.Contract(abi, this._contractAddress);
  }

  public async contractName(): Promise<string> {
    const result = await this._contract.methods.contractName().call();
    return result;
  }


  public async getPlayers(): Promise<string[]> {
    const result = await this._contract.methods.getPlayers().call();
    return result;
  }

  public async pickWinner(): Promise<any> {
    const manager = await this._contract.methods.manager().call()
    const payload = {from: manager }
    const result = await this._contract.methods.pickWinner().send(payload)
  
    const winner = {
      blocHash: result.blockHash,
      transactionHash: result.transactionHash,
    }
  
    return winner;
  }

  public async enter(players: Player[]): Promise<boolean> {
    try {
      players.forEach( async (player: Player) => {
        const valueWei = this._web3.utils.toWei(player.value, 'ether');
        const payload = ({ 
          from: player.address, 
          value: valueWei 
        });
        const  result = await this._contract.methods.enter().send(payload)      
      })

      return true
    } catch (error) {
        console.error("Error entering lottery:", error);
        throw new Error("Failed to enter lottery.");
    }
  }

  public subscribeToWinnerPicked(callback: (winner: string) => void) {
    this._contract.events.WinnerPicked()
        .on('data', event => {
            callback(event.returnValues.winner);
        })
        .on('error', console.error);
  }
}

export default LotteryContract;

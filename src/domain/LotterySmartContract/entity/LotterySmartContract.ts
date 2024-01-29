import { Bet } from '../interface/Bet';
import ContractDetails from './ContractDetails';
import Web3Connection from './Web3Connection';

class LotterySmartContract {
  private _contract: any;
  private _web3: any;

  public constructor(
    contractDetails: ContractDetails,
    web3Conn: Web3Connection,
  ) {
    const abi = contractDetails.getABI();
    const contractAddress = contractDetails.getContractAddress();
    this._web3 = web3Conn.getConnection();
    this._contract = new this._web3.eth.Contract(abi, contractAddress);
  }

  public async contractName(): Promise<any> {
    const result = await this._contract.methods.contractName().call();
    return result;
  }

  public async getPlayers(): Promise<any> {
    const result = await this._contract.methods.getPlayers().call();
    return result;
  }

  public async pickWinner(): Promise<any> {
    const result = await this._contract.methods.pickWinner().call();
    return result;
  }

  public async enter(bet: Bet): Promise<any> {
    const valueWei = this._web3.utils.toWei(bet.betAmount, 'ether');

    const payload = {
      value: valueWei,
      from: bet.addressFrom,
    };

    const result = await this._contract.methods.enter().send(payload);

    return result;
  }
}

export default LotterySmartContract;

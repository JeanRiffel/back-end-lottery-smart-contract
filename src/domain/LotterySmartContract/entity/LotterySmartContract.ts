import ContractDetails from './ContractDetails';
import Web3Connection from './Web3Connection';

class LotterySmartContract {
  private web3: Web3Connection;
  private contractAddress = '';
  private abi: any[] = [];

  public constructor(contractDetails: ContractDetails, web3Conn: Web3Connection)
  {
    this.web3 = web3Conn;
    this.contractAddress = contractDetails.getContractAddress();
    this.abi = contractDetails.getABI();
  }

  public getContract(): any {
    const web3Eth = this.web3.eth();
    return new web3Eth.Contract(this.abi, this.contractAddress);
  }

  public getToWei(value: any): any {
    const web3Utils = this.web3.utils();
    return web3Utils.toWei(value, 'ether');
  }

  public getContractAddress(): any {
    return this.contractAddress;
  }
}

export default LotterySmartContract;

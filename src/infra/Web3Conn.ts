import Web3 from 'web3';
import Web3Connection from '../domain/LotterySmartContract/entity/Web3Connection';

class Web3Conn implements Web3Connection {
  private web3: Web3;

  constructor(provider: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }

  getConnection(): Web3 {
    return this.web3;
  }
}

export default Web3Conn;

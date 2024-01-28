import Web3 from 'web3';
import Web3Connection from '../entity/Web3Connection';

class Web3Conn implements Web3Connection {
  private web3: Web3;

  constructor(provider: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }

  eth() {
    return this.web3.eth;
  }

  utils() {
    return this.web3.utils;
  }

  getConnection(): Web3 {
    return this.web3;
  }
}

export default Web3Conn;

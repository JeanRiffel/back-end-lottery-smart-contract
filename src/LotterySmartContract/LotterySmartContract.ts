import Web3 from 'web3';

class LotterySmartContract {
  private web3: Web3;
  private contractAddress = '0x19313e6C58fb0E80030FEa647807c95771D5281C';
  private provider: string = 'HTTP://127.0.0.1:7545';
  private abi: any[] = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "contractName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  }
  ]

  public constructor(){
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
  }

  public getContract(): any {
    const contractABI: any[] = this.abi;
    const contractAddress = this.contractAddress;
    return new this.web3.eth.Contract(contractABI, contractAddress);
  }

  public getToWei(value: any): any {
    return this.web3.utils.toWei(value, 'ether');
  }

  public getContractAddress(): any {
    console.log('------<<<<<<')
    return this.contractAddress;
  }
}

export default LotterySmartContract;

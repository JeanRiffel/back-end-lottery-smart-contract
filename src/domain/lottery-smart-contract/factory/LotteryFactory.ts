import { LotterySmartContract } from '../entity/LotterySmartContract';
import ContractDetailsLottery from '../../../infra/ContractDetailsLottery';
import Web3Conn from '../../../infra/Web3Conn';
import LotteryContract from '../entity/LotteryContract';

class LotteryFactory {
  getSmartContract(): LotterySmartContract {
    const contractDetailsLottery = new ContractDetailsLottery();

    const web3Conn = new Web3Conn(
      contractDetailsLottery.getContractServerProvider(),
    );

    return new LotteryContract(contractDetailsLottery, web3Conn);
  }
}

export default LotteryFactory;

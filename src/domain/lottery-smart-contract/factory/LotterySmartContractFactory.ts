import { LotterySmartContract } from '../entity/LotterySmartContract';
import Web3ConnectionSmartContractLottery from '../../../infra/Web3ConnectionSmartContractLottery';
import LotteryContract from '../entity/LotteryContract';

class LotterySmartContractFactory {
  buildSmartContractLottery(): LotterySmartContract {
    const web3ConnectionSmartContractLottery = new Web3ConnectionSmartContractLottery(
      process.env.GANACHE_ADDRESS
    );
    return new LotteryContract(web3ConnectionSmartContractLottery);
  }
}

export default LotterySmartContractFactory;

interface ContractDetails {
  getContractAddress(): string;
  getContractServerProvider(): string;
  getABI(): any[];
}

export default ContractDetails;

import { Test, TestingModule } from '@nestjs/testing';
import { LotteryService } from '../lottery.service';
import { LotterySmartContract } from '../../entity/LotterySmartContract';
import { DefaultErrors } from '../../utils/enumHelper';

describe('LotteryService', () => {
    let lotteryService: LotteryService;
    let mockLotterySmartContract: any;

    beforeEach(async () => {
        mockLotterySmartContract = {
            pickWinner: jest.fn(),
            contractName: jest.fn(),
            enter: jest.fn(),
            getPlayers: jest.fn(),
        };

        // Mocking the LotteryFactory to return the mocked contract
        jest.mock('../../factory/LotteryFactory', () => {
            return jest.fn().mockImplementation(() => ({
                getSmartContract: jest.fn().mockReturnValue(mockLotterySmartContract),
            }));
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [LotteryService],
        }).compile();

        lotteryService = module.get<LotteryService>(LotteryService);
    });

    it('should return a winner', async () => {
        mockLotterySmartContract.pickWinner.mockResolvedValue('0xWinnerAddress');

        const result = await lotteryService.pickWinner();
        expect(result).toBe('0xWinnerAddress');
        expect(mockLotterySmartContract.pickWinner).toHaveBeenCalled();
    });

    it('should handle error when picking a winner', async () => {
        mockLotterySmartContract.pickWinner.mockRejectedValue(new Error('Some error'));

        const result = await lotteryService.pickWinner();
        expect(result).toBe(DefaultErrors.WinnerNotRetrivied.concat(' Some error '));
    });

    it('should return the contract name', async () => {
        mockLotterySmartContract.contractName.mockResolvedValue('The Lottery Contract is OnLine');

        const result = await lotteryService.getContractName();
        expect(result).toBe('The Lottery Contract is OnLine');
    });

    it('should handle error when retrieving the contract name', async () => {
        mockLotterySmartContract.contractName.mockRejectedValue(new Error());

        const result = await lotteryService.getContractName();
        expect(result).toBe(DefaultErrors.RetrieveContractName);
    });

    it('should allow placing a bet', async () => {
        const address = '0xAddress';
        const value = '0.01';
        mockLotterySmartContract.enter.mockResolvedValue('Bet placed');

        const result = await lotteryService.placeBet(address, value);
        expect(result).toBe('Bet placed');
        expect(mockLotterySmartContract.enter).toHaveBeenCalledWith(address, { value });
    });

    it('should handle error when placing a bet', async () => {
        const address = '0xAddress';
        const value = '0.01';
        mockLotterySmartContract.enter.mockRejectedValue(new Error('Bet error'));

        const result = await lotteryService.placeBet(address, value);
        expect(result).toBe(DefaultErrors.BetError.concat('Bet error'));
    });

    it('should return players', async () => {
        const players = ['0x123', '0x456'];
        mockLotterySmartContract.getPlayers.mockResolvedValue(players);

        const result = await lotteryService.getPlayers();
        expect(result).toEqual(players);
    });
});

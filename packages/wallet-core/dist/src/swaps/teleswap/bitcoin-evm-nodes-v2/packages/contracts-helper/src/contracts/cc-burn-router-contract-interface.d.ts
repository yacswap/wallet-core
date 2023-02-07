export = CcBurnRouter;
declare class CcBurnRouter extends EthereumBase {
    static parseCcBurnEvent(event: any, sourceNetworkName?: string): {
        addressType: any;
        addressScript: any;
        address: any;
        requestIndex: any;
        amount: any;
        burntAmount: any;
        lockerTargetAddress: any;
        lockerLockingScript: any;
        userTargetAddress: any;
        deadline: any;
        txInfo: {
            blockNumber: any;
            logIndex: any;
            transactionHash: any;
            eventName: any;
            signature: any;
        };
    };
    static parsePaidBurnEvent(event: any): {
        bitcoinTxId: any;
        bitcoinTxOutputIndex: any;
        lockerTargetAddress: any;
        requestIndex: any;
    };
    static parseBurnDisputeEvent(event: any): {
        lockerLockingScript: any;
        userTargetAddress: any;
        lockerTargetAddress: any;
        requestIndex: any;
    };
    static parseLockerDisputeEvent(event: any): {
        txId: any;
        amount: any;
        lockerLockingScript: any;
        blockNumber: any;
        lockerTargetAddress: any;
    };
    constructor(connectionInfo: any, contractAddress: any);
    contractAddress: any;
    contract: any;
    getProtocolPercentageFee(): Promise<any>;
    getBitcoinFee(): Promise<any>;
    isTransferred(lockerTargetAddress: any, index: any): Promise<any>;
    isUsedAsBurnProof(bitcoinTxId: any): Promise<any>;
    getBurnTransferDeadline(): Promise<any>;
    getBurnEvents(fromBlock?: number): Promise<any>;
    getPaidBurnEvents(fromBlock?: number): Promise<any>;
    getBurnDisputeEvents(fromBlock?: number): Promise<any>;
    getLockerDisputeEvents(fromBlock?: number): Promise<any>;
    sendBurnProof(parsedTx: any, merkleProof: any, blockNumber: any, requestIndexes: any, voutIndexes: any, lockerLockingScript: any, blockFee: any, nonce?: null): Promise<{
        success: any;
        txId: any;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        txId?: undefined;
    }>;
    disputeBurn(lockerLockingScript: any, arrayOfRequestIndexes: any, nonce?: null): Promise<{
        success: any;
        txId: any;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        txId?: undefined;
    }>;
    disputeLocker(lockerLockingScript: any, input: any, output: any, blockFee: any, nonce?: null): Promise<{
        success: any;
        txId: any;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        txId?: undefined;
    }>;
}
import EthereumBase = require("../ethereum-base");

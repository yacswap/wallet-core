export = CcTransferRouter;
declare class CcTransferRouter extends EthereumBase {
    constructor(connectionInfo: any, contractAddress: any);
    contractAddress: any;
    contract: any;
    getNeededConfirmations(): Promise<any>;
    getProtocolPercentageFee(): Promise<any>;
    isUsed(txId: any): Promise<any>;
    sendTransferRequest(lockerScript: any, parsedTx: any, merkleProof: any, blockNumber: any, blockFee: any, nonce?: undefined): Promise<any>;
}
import EthereumBase = require("../ethereum-base");

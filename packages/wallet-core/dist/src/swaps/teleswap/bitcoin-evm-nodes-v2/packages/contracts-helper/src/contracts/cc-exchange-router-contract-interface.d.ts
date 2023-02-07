export = CcExchangeRouter;
declare class CcExchangeRouter extends EthereumBase {
    constructor(connectionInfo: any, contractAddress: any);
    contractAddress: any;
    contract: any;
    getProtocolPercentageFee(): Promise<any>;
    isUsed(txId: any): Promise<any>;
    sendExchangeRequest(lockerScript: any, parsedTx: any, merkleProof: any, blockNumber: any, blockFee: any, nonce?: undefined): Promise<any>;
}
import EthereumBase = require("../ethereum-base");

export = BaseBitcoinLikeRpc;
declare class BaseBitcoinLikeRpc {
    static getAxiosInstance(provider: any): any;
    static getRpcBody(method: any, params?: any[]): {
        jsonrpc: string;
        id: string;
        method: any;
        params: any[];
    };
    constructor({ headers, url, auth }: {
        headers: any;
        url: any;
        auth: any;
    });
    axios: any;
    getChainInfo(): Promise<any>;
    getLatestBlockNumber(): Promise<any>;
    getBlockHash(blockNumber: any): Promise<any>;
    getBlockByBlockHash(blockHash: any, verbosity?: number): Promise<any>;
    getBlockHeaderByBlockHash(blockHash: any): Promise<any>;
    getBlockByBlockNumber(blockNumber: any, verbosity: any): Promise<any>;
    getTransaction(txId: any): Promise<{
        txId: any;
        version: any;
        locktime: any;
        blockNumber: any;
        blockHash: any;
        vout: any;
    }>;
    getRawTransaction(txId: any): Promise<any>;
    getTxOutProof(txId: any): Promise<any>;
    getBlockTransactionIds(blockHash: any): Promise<any>;
    sendRawTransaction(txHex: any, maxFeeRate?: number): Promise<any>;
    getBlockHeaderHex(blockNumber: any): Promise<any>;
    getEstimateFeeByNumberOfBlock(n: any): Promise<number>;
    getFeeRate(speed?: string): Promise<any>;
}

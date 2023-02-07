export = WrappedToken;
declare class WrappedToken extends EthereumBase {
    constructor(connectionConfig: any, contractAddress: any, unit: any);
    contractAddress: any;
    contract: any;
    unit: any;
    setDecimal(): Promise<void>;
    getDecimal(): Promise<any>;
    mintTestToken(): Promise<any>;
    approve(address: any, amount: any): Promise<any>;
    getBalance(address: any): Promise<any>;
    getApprovedBalanceForAddress(address: any): Promise<any>;
}
import EthereumBase = require("../ethereum-base");

export = TeleportDaoPayment;
declare class TeleportDaoPayment {
    static getTransferOpReturnData({ chainId, appId, recipientAddress, percentageFee, speed, isExchange, exchangeTokenAddress, outputAmount, deadline, isFixedToken, }: {
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        speed?: number | undefined;
        isExchange?: boolean | undefined;
        exchangeTokenAddress?: string | undefined;
        outputAmount?: number | undefined;
        deadline: any;
        isFixedToken?: boolean | undefined;
    }): string;
    static getLendingOpReturnData({ chainId, appId, recipientAddress, percentageFee, mode, isBorrow, tokenAddress, borrowAmount, }: {
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        mode: any;
        isBorrow?: boolean | undefined;
        tokenAddress?: string | undefined;
        borrowAmount?: number | undefined;
    }): string;
    payBurnRequest(receivers: any): Promise<any>;
    transferBitcoinToEth({ lockerAddress, amount, chainId, appId, recipientAddress, percentageFee, speed, isExchange, exchangeTokenAddress, outputAmount, deadline, isFixedToken, feeSpeed, }: {
        lockerAddress: any;
        amount: any;
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        speed?: number | undefined;
        isExchange?: boolean | undefined;
        exchangeTokenAddress?: string | undefined;
        outputAmount?: number | undefined;
        deadline: any;
        isFixedToken?: boolean | undefined;
        feeSpeed?: string | undefined;
    }): Promise<any>;
    getBitcoinToEthTargetOutputs({ lockerAddress, amount, chainId, appId, recipientAddress, percentageFee, speed, isExchange, exchangeTokenAddress, outputAmount, deadline, isFixedToken, }: {
        lockerAddress: any;
        amount: any;
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        speed?: number | undefined;
        isExchange?: boolean | undefined;
        exchangeTokenAddress?: string | undefined;
        outputAmount?: number | undefined;
        deadline: any;
        isFixedToken?: boolean | undefined;
    }): Promise<any[]>;
    getBitcoinToEthUnsignedPsbt({ extendedUtxo, lockerAddress, amount, chainId, appId, recipientAddress, percentageFee, speed, isExchange, exchangeTokenAddress, outputAmount, deadline, isFixedToken, feeSpeed, }: {
        extendedUtxo: any;
        lockerAddress: any;
        amount: any;
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        speed?: number | undefined;
        isExchange?: boolean | undefined;
        exchangeTokenAddress?: string | undefined;
        outputAmount?: number | undefined;
        deadline: any;
        isFixedToken?: boolean | undefined;
        feeSpeed?: string | undefined;
    }): Promise<any>;
    bitcoinToEthLend({ lockerAddress, amount, chainId, appId, recipientAddress, percentageFee, mode, isBorrow, tokenAddress, borrowAmount, }: {
        lockerAddress: any;
        amount: any;
        chainId: any;
        appId: any;
        recipientAddress: any;
        percentageFee: any;
        mode?: number | undefined;
        isBorrow?: boolean | undefined;
        tokenAddress?: string | undefined;
        borrowAmount?: number | undefined;
    }): Promise<any>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EvmChain_1 = require("../../EvmChain");
const types_1 = require("../../../types");
exports.default = new EvmChain_1.EvmChain({
    id: types_1.ChainId.Optimism,
    name: 'Optimism',
    code: 'OPTIMISM',
    color: '#bf0205',
    nativeAsset: [
        {
            name: 'Optimism ETH',
            chain: types_1.ChainId.Optimism,
            type: types_1.AssetTypes.native,
            code: 'OPTETH',
            priceSource: { coinGeckoId: 'ethereum' },
            color: '#bf0205',
            decimals: 18,
            matchingAsset: 'ETH',
        },
    ],
    isEVM: true,
    hasTokens: true,
    isMultiLayered: true,
    averageBlockTime: 1,
    safeConfirmations: 1,
    txFailureTimeoutMs: 600000,
    network: {
        name: 'optimism_mainnet',
        coinType: '60',
        networkId: 10,
        chainId: 10,
        isTestnet: false,
        rpcUrls: ['https://optimism-mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'],
    },
    explorerViews: [
        {
            tx: 'https://optimistic.etherscan.io/tx/{hash}',
            address: 'https://optimistic.etherscan.io/address/{address}',
            token: 'https://optimistic.etherscan.io/token/{token}',
        },
    ],
    multicallSupport: true,
    ledgerSupport: false,
    EIP1559: false,
    gasLimit: {
        send: {
            native: 21000,
            nonNative: 100000,
        },
        sendL1: {
            native: 5000,
            nonNative: 5500,
        },
    },
    fees: {
        unit: 'gwei',
        magnitude: 1e9,
    },
    supportCustomFees: false,
});
//# sourceMappingURL=optimism.js.map
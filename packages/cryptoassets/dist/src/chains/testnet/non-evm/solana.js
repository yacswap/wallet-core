"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const solana_1 = tslib_1.__importDefault(require("../../mainnet/non-evm/solana"));
const utils_1 = require("../../utils");
exports.default = (0, utils_1.transformMainnetToTestnetChain)(solana_1.default, {
    name: 'Solana Testnet',
    networkId: 'testnet',
    coinType: '501',
    isTestnet: true,
    rpcUrls: [
        'https://api.testnet.solana.com',
        'https://solana--devnet.datahub.figment.io/apikey/d7d9844ccf72ad4fef9bc5caaa957a50',
    ],
}, [
    {
        tx: 'https://explorer.solana.com/tx/{hash}?cluster=testnet',
        address: 'https://explorer.solana.com/address/{address}?cluster=testnet',
    },
], 'https://solfaucet.com/');
//# sourceMappingURL=solana.js.map
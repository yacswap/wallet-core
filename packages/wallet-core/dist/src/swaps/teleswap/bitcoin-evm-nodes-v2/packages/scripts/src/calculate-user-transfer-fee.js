"use strict";
const tslib_1 = require("tslib");
const { BitcoinInterface } = require("@sinatdt/bitcoin");
const { BigNumber } = require("bignumber.js");
const { BitcoinRelay, CcTransferRouter, CcExchangeRouter, CcBurnRouter, LockerContract } = require("@sinatdt/contracts-helper").contracts;
let { contractsInfo } = require("@sinatdt/configs").teleswap;
const polygonContracts = contractsInfo.polygon;
const { getAxiosInstance } = require("./utils/tools");
const { getWeb3Eth } = require("./helper");
function getFeeParams({ targetNetworkConnectionInfo, testnet = false }) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let sourceNetworkConnection = {
            api: {
                enabled: true,
                provider: "BlockStream",
            },
        };
        let sourceNetworkName = testnet ? "bitcoin_testnet" : "bitcoin";
        const btcInterface = new BitcoinInterface(sourceNetworkConnection, sourceNetworkName);
        let contracts = testnet ? polygonContracts.testnet : polygonContracts.mainnet;
        let api = getAxiosInstance({ baseUrl: "https://api.binance.com/api/v3/" });
        let price = (_a = (yield api.get("/ticker/price?symbol=MATICBTC"))) === null || _a === void 0 ? void 0 : _a.data.price;
        if (!price) {
            throw new Error("cant get price");
        }
        price = +price;
        let { baseEth, connectionConfig } = getWeb3Eth(targetNetworkConnectionInfo);
        let relay = new BitcoinRelay(connectionConfig, contracts.relayAddress);
        let ccTransfer = new CcTransferRouter(connectionConfig, contracts.ccTransferAddress);
        let ccExchange = new CcExchangeRouter(connectionConfig, contracts.ccExchangeAddress);
        let locker = new LockerContract(connectionConfig, contracts.lockerAddress);
        let ccBurn = new CcBurnRouter(connectionConfig, contracts.ccBurnAddress);
        let lastRelayBlockFee = yield relay.getLastBlockFee();
        let relayFee = new BigNumber(lastRelayBlockFee).dividedBy(1e18).toFixed();
        const gasUsed = new BigNumber(460000 * (1 + 0.01)).toFixed();
        let gasPrize = yield baseEth.web3Eth.getGasPrice();
        let teleportFee = new BigNumber(gasUsed).multipliedBy(gasPrize).dividedBy(1e18).toFixed();
        const protocolPercentageFeeCCTransfer = +((yield (ccTransfer === null || ccTransfer === void 0 ? void 0 : ccTransfer.getProtocolPercentageFee())) || 0) / 100;
        const protocolPercentageFeeCCExchange = +((yield (ccExchange === null || ccExchange === void 0 ? void 0 : ccExchange.getProtocolPercentageFee())) || 0) / 100;
        const protocolPercentageFeeCCBurn = +((yield (ccBurn === null || ccBurn === void 0 ? void 0 : ccBurn.getProtocolPercentageFee())) || 0) / 100;
        const burnBitcoinFee = +((yield (ccBurn === null || ccBurn === void 0 ? void 0 : ccBurn.getBitcoinFee())) || 0);
        const lockerPercentageFee = +((yield (locker === null || locker === void 0 ? void 0 : locker.getLockerPercentageFee())) || 0) / 100;
        const feeRate = +((yield btcInterface.getFeeRate("normal")) || 0);
        return {
            price,
            gasPrize,
            lastRelayBlockFee,
            relayFee,
            teleportFee,
            protocolPercentageFeeCCTransfer,
            protocolPercentageFeeCCExchange,
            protocolPercentageFeeCCBurn,
            burnBitcoinFee,
            lockerPercentageFee,
            feeRate,
        };
    });
}
function calculateTransferFee({ amount, feeInfo, minimumFee, teleporterFeeRatio = 2, type }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { price, relayFee, teleportFee, protocolPercentageFeeCCTransfer, protocolPercentageFeeCCExchange, lockerPercentageFee, feeRate, } = feeInfo;
        let totalFeeForTeleporter = new BigNumber(teleportFee).plus(relayFee).toFixed();
        let toBtcRate = price;
        let calculatedTeleporterFee = BigNumber.maximum(minimumFee, new BigNumber(totalFeeForTeleporter).multipliedBy(toBtcRate))
            .multipliedBy(teleporterFeeRatio)
            .toFixed();
        let teleporterPercentageFee = BigNumber.maximum(0.01, new BigNumber(calculatedTeleporterFee).dividedBy(amount).multipliedBy(100)).toFixed(2);
        let protocolPercentageFee = type === "transfer" ? protocolPercentageFeeCCTransfer : protocolPercentageFeeCCExchange;
        let teleporterFeeInBTC = new BigNumber(teleporterPercentageFee)
            .dividedBy(100)
            .multipliedBy(amount)
            .toFixed(8);
        let protocolFeeInBTC = new BigNumber(protocolPercentageFee)
            .dividedBy(100)
            .multipliedBy(amount)
            .toFixed(8);
        let lockerFeeInBTC = new BigNumber(lockerPercentageFee)
            .dividedBy(100)
            .multipliedBy(amount)
            .toFixed(8);
        let TransactionFeeInBTC = new BigNumber(type === "transfer" ? 200 : 300)
            .multipliedBy(feeRate)
            .dividedBy(1e8)
            .toFixed(8);
        let totalFeeInBTC = new BigNumber(teleporterFeeInBTC)
            .plus(protocolFeeInBTC)
            .plus(lockerFeeInBTC)
            .plus(TransactionFeeInBTC)
            .toFixed(8);
        let receivedAmount = new BigNumber(amount).minus(totalFeeInBTC).toFixed(8);
        return {
            teleporterPercentageFee,
            protocolPercentageFee,
            lockerPercentageFee,
            teleporterFeeInBTC,
            protocolFeeInBTC,
            lockerFeeInBTC,
            TransactionFeeInBTC,
            totalFeeInBTC,
            receivedAmount,
        };
    });
}
function calculateBurnFee({ amount, feeInfo }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { protocolPercentageFeeCCBurn, burnBitcoinFee, lockerPercentageFee } = feeInfo;
        let protocolPercentageFee = protocolPercentageFeeCCBurn;
        let protocolFeeInBTC = new BigNumber(protocolPercentageFee)
            .dividedBy(100)
            .multipliedBy(amount)
            .toFixed(8);
        let burnBitcoinFeeInBTC = new BigNumber(burnBitcoinFee).dividedBy(1e8).toFixed(8);
        let realBtcAmount = new BigNumber(amount).minus(burnBitcoinFeeInBTC).toFixed(8);
        let lockerFeeInBTC = new BigNumber(lockerPercentageFee)
            .dividedBy(100)
            .multipliedBy(realBtcAmount)
            .toFixed(8);
        const instantSettlementFeeInBTC = lockerFeeInBTC;
        const instantSettlementPercentageFee = lockerPercentageFee;
        let totalFeeInBTC = new BigNumber(protocolFeeInBTC)
            .plus(burnBitcoinFeeInBTC)
            .plus(lockerFeeInBTC)
            .plus(instantSettlementFeeInBTC)
            .toFixed(8);
        let receivedAmount = new BigNumber(amount).minus(totalFeeInBTC).toFixed(8);
        return {
            protocolPercentageFee,
            lockerPercentageFee,
            instantSettlementPercentageFee,
            protocolFeeInBTC,
            burnBitcoinFeeInBTC,
            lockerFeeInBTC,
            instantSettlementFeeInBTC,
            totalFeeInBTC,
            receivedAmount,
        };
    });
}
function calculateFee({ amount, type = "transfer", teleporterFeeRatio = 2, minimumFee = 0.00001, targetNetworkConnectionInfo, testnet = false, feeParams = undefined, }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let feeInfo = feeParams ||
            (yield getFeeParams({
                targetNetworkConnectionInfo,
                testnet,
            }));
        switch (type) {
            case "transfer":
            case "exchange":
                return calculateTransferFee({ amount, feeInfo, minimumFee, teleporterFeeRatio, type });
            case "burn":
                return calculateBurnFee({ amount, feeInfo });
            default:
                throw new Error("type is incorrect");
        }
    });
}
module.exports = { calculateFee, getFeeParams };
//# sourceMappingURL=calculate-user-transfer-fee.js.map
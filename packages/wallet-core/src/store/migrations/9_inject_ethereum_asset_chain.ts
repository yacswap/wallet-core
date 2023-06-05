import { ChainId, getAsset } from '@yac-swap/cryptoassets';

export const injectEthereumAssetChain = {
  // Inject ethereum asset -> chain
  version: 9,
  migrate: async (state: any) => {
    const injectEthereumChain = getAsset(state.activeNetwork, state.injectEthereumAsset).chain || ChainId.Ethereum;

    delete state.injectEthereumAsset;

    return { ...state, injectEthereumChain };
  },
};

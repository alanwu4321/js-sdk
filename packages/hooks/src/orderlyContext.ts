import { createContext } from "react";

import {
  type ConfigStore,
  type OrderlyKeyStore,
  type getWalletAdapterFunc,
} from "@orderly.network/core";

import { NetworkId } from "@orderly.network/types";

export interface OrderlyConfigContextState {
  fetcher?: (url: string, init: RequestInit) => Promise<any>;

  configStore: ConfigStore;
  keyStore: OrderlyKeyStore;
  getWalletAdapter: getWalletAdapterFunc;

  networkId: NetworkId;

  onlyTestnet?: boolean;
  enableSwapDeposit?: boolean;
  // extraApis:ExtraAPIs
}

export const OrderlyContext = createContext<OrderlyConfigContextState>({
  // configStore: new MemoryConfigStore(),
} as OrderlyConfigContextState);

export const OrderlyProvider = OrderlyContext.Provider;

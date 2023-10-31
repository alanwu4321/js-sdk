import { useCallback, useContext } from "react";

import { OrderlyContext } from "../orderlyContext";
import { useAccountInstance } from "../useAccountInstance";
import { useBoolean } from "../useBoolean";

export const useWooSwapQuery = () => {
  const { configStore } = useContext<any>(OrderlyContext);
  const account = useAccountInstance();
  const [loading, { setTrue: start, setFalse: stop }] = useBoolean(false);
  /// swap 询价

  const query = useCallback(
    (inputs: any) => {
      if (loading) return;
      start();

      const params = {
        // src_network: inputs.srcNetwork,
        network: "arbitrum",
        from_token: inputs.srcToken,
        to_token: inputs.dstToken, //account.assetsManager.usdcAddress,
        from_amount: inputs.amount, //inputs.amount,
        slippage: inputs.slippage || 1,
        // to_token:account.assetsManager.usdcAddress,
      };

      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join("&");

      return fetch(
        `${configStore.get("swapSupportApiUrl")}/woofi_dex/swap?${queryString}`
      )
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
          return res.json();
        })
        .then((data) => {
          if (data.status === "ok") {
            return data.data;
          }
          throw new Error(data.message);
        })
        .finally(() => stop());
    },
    [account]
  );

  return {
    query,
    loading: false,
  };
};

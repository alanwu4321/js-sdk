import { FC, useCallback, useContext, useMemo, useState } from "react";
import { AccountStatusProps } from "../accountStatusBar";
import { AccountStatusEnum } from "@orderly.network/types";
import { Chains } from "../sections/desktop/chains.desktop";
import { cn } from "@/utils/css";
import {
  useAccount,
  useChains,
  useWalletConnector,
  OrderlyContext,
} from "@orderly.network/hooks";
import { toast } from "@/toast";
import { OrderlyAppContext } from "@/provider";
import { DesktopWalletConnnectButton } from "./walletConnectButton.desktop";


// 

export interface DesktopDropMenuItem {
  title: string;
  key: any;
}

export const AccountStatus: FC<AccountStatusProps & { className?: string, dropMenuItem?: DesktopDropMenuItem[] | React.ReactNode, onClickDropMenuItem?: (item: DesktopDropMenuItem) => void }> = (
  props
) => {
  const { status = AccountStatusEnum.NotConnected, dropMenuItem, onClickDropMenuItem } = props;
  const { account, state } = useAccount();
  const [open, setOpen] = useState(false);
  const { onWalletDisconnect } =
    useContext(OrderlyAppContext);

  const { networkId, enableSwapDeposit } = useContext<any>(OrderlyContext);
  const { connectedChain } = useWalletConnector();
  const [allChains, { findByChainId }] = useChains("", {
    enableSwapDeposit,
    pick: "network_infos",
    filter: (chain: any) =>
      chain.network_infos?.bridge_enable || chain.network_infos?.bridgeless,
    // filter: (chain: API.Chain) => chain.network_infos?.chain_id === 421613,
  });

  const chains = useMemo(() => {
    if (Array.isArray(allChains)) return allChains;
    if (allChains === undefined) return [];

    if (connectedChain && parseInt(connectedChain.id, 16) === 421613) {
      return allChains.testnet ?? [];
    }

    return allChains.mainnet;
  }, [allChains, connectedChain]);


  return (
    <div
      className={cn(
        "orderly-h-full orderly-flex orderly-items-center orderly-space-x-2",
        props.className
      )}
    >
      <Chains
        disabled={status < AccountStatusEnum.NotConnected}
        className="orderly-rounded-full"
      />
      <DesktopWalletConnnectButton
        status={status}
        chains={chains}
        address={props.address}
        balance={props.balance}
        currency={props.currency}
        totalValue={props.totalValue}
        accountInfo={account}
        loading={props.loading}
        onConnect={props.onConnect}
        onDisconnect={props.onDisconnect}
        showGetTestUSDC={props.showGetTestUSDC}

        className={props.className}
        dropMenuItem={props.dropMenuItem}
        onClickDropMenuItem={props.onClickDropMenuItem}
      />
    </div>
  );
};
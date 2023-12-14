import { FC, ReactNode, useCallback, useContext, useMemo } from "react";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatus } from "@/block/accountStatus/accountStatus";
import { AccountStatusEnum } from "@orderly.network/types";
import { WalletConnectSheet } from "@/block/walletConnect";
import { modal } from "@/modal";
import { OrderlyAppContext } from "@/provider/appProvider";
import { showAccountConnectorModal } from "@/block/walletConnect/walletModal";
import { ChainIdSwtich } from "@/block/accountStatus/sections/chainIdSwitch";
import { Logo } from "@/logo";

interface Props {
  logo?: ReactNode;
}

export const Header: FC<Props> = (props) => {
  const { state } = useAccount();
  const { errors, appIcons: logos } = useContext(OrderlyAppContext);
  const { onWalletConnect, onSetChain, onWalletDisconnect } =
    useContext(OrderlyAppContext);
  const onConnect = useCallback(() => {
    onWalletConnect().then(
      (result: { wallet: any; status: AccountStatusEnum }) => {
        if (result && result.status < AccountStatusEnum.EnableTrading) {
          showAccountConnectorModal({
            status: result.status,
          });
        }
      }
    );
  }, []);

  const logoElement = useMemo(() => {
    if (logos?.appBar?.component) {
      return logos?.appBar?.component;
    }
    if (logos?.appBar?.img) {
      return <img src={logos?.appBar?.img} />;
    }
    return null;
  }, [logos?.appBar]);

  return (
    <div>
      <div className="orderly-h-[48px] orderly-flex">
        <div className="orderly-flex-1">
          <Logo />
        </div>

        <AccountStatus
          status={state.status}
          address={state.address}
          chains={[]}
          accountInfo={undefined}
          className="orderly-mr-3"
          onConnect={onConnect}
        />
      </div>
      {errors.ChainNetworkNotSupport && (
        <ChainIdSwtich onSetChain={onSetChain} />
      )}
    </div>
  );
};
